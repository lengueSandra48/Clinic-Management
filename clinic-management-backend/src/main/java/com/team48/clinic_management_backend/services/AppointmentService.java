package com.team48.clinic_management_backend.services;

import com.team48.clinic_management_backend.dtos.AppointmentCreationDTO;
import com.team48.clinic_management_backend.dtos.AppointmentDTO;
import com.team48.clinic_management_backend.entities.Appointment;
import com.team48.clinic_management_backend.entities.AppointmentStatus;
import com.team48.clinic_management_backend.exceptions.BusinessException;
import com.team48.clinic_management_backend.repositories.AppointmentRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AppointmentService {
    private final AppointmentRepository appointmentRepository;
    private final NotificationService notificationService;

    @Transactional
    public AppointmentDTO createAppointment(AppointmentCreationDTO dto, String secretaryEmail) {
        // Vérification des contraintes métier
        validateAppointmentConstraints(dto);

        // Création du rendez-vous
        Appointment appointment = new Appointment();
        //  Mapping des champs depuis le DTO

        appointment.setStatus(AppointmentStatus.SCHEDULED);
        Appointment savedAppointment = appointmentRepository.save(appointment);

        // Notification
        notificationService.notifyDoctor(appointment.getDoctor(), "Nouveau RDV programmé");
        notificationService.notifyPatient(appointment.getPatient(), "Confirmation de RDV");

        return mapToDTO(savedAppointment);
    }

    private AppointmentDTO mapToDTO(Appointment appointment) {
        return new AppointmentDTO(
                appointment.getId(),
                appointment.getStarTime(),
                appointment.getEndTime(),
                appointment.getStatus().name(),
                appointment.getDoctor().getFullName(),
                appointment.getDoctor().getSpecialization(),
                appointment.getPatient().getFullName(),
                appointment.getPatient().getInsuranceId(),
                appointment.getCancellationReason(),
                appointment.getNotes()
        );
    }

    private void validateAppointmentConstraints(AppointmentCreationDTO dto) {
        // 1. Médecin pas disponible
        if (appointmentRepository.existsDoctorOverlap(dto.getDoctorId(), dto.getStartTime(), dto.getEndTime())) {
            throw new BusinessException("Le médecin a déjà un rendez-vous à ce créneau");
        }

        // 2. Patient a déjà un RDV ce jour-là
        LocalDate appointmentDate = dto.getStartTime().toLocalDate();
        if (appointmentRepository.existsPatientAppointmentOnDate(dto.getPatientId(), appointmentDate)) {
            throw new BusinessException("Le patient a déjà un rendez-vous ce jour");
        }
    }

    @Transactional
    @PreAuthorize("hasRole('SECRETARY') or hasRole('ADMIN')")
    public void cancelAppointment(Long appointmentId, String cancellationReason) {
        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new BusinessException("Rendez-vous non trouvé"));

        // Vérification délai 24h
        if (LocalDateTime.now().isAfter(appointment.getStarTime().minusHours(24))) {
            throw new BusinessException("Annulation impossible moins de 24h avant");
        }

        appointment.setStatus(AppointmentStatus.CANCELLED);
        appointment.setCancellationReason(cancellationReason);
        appointmentRepository.save(appointment);

        // Notification
        notificationService.notifyDoctor(appointment.getDoctor(), "RDV annulé");
        notificationService.notifyPatient(appointment.getPatient(), "Annulation de votre RDV");
    }


    public List<AppointmentDTO> getByDoctorAndDate(Long doctorId, LocalDate date) {
        List<Appointment> appointments = appointmentRepository.findByDoctorIdAndDate(doctorId, date);

        return appointments.stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

}