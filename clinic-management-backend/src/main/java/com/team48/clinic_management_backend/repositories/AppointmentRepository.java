package com.team48.clinic_management_backend.repositories;

import com.team48.clinic_management_backend.entities.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    // Vérifie les chevauchements de rendez-vous pour un médecin
    @Query("SELECT CASE WHEN COUNT(a) > 0 THEN true ELSE false END " +
            "FROM Appointment a " +
            "WHERE a.doctor.id = :doctorId " +
            "AND a.status <> com.team48.clinic_management_backend.entities.AppointmentStatus.CANCELLED " +
            "AND :startTime < a.endTime " +
            "AND :endTime > a.starTime")
    boolean existsDoctorOverlap(@Param("doctorId") Long doctorId,
                                @Param("starTime") LocalDateTime starTime,
                                @Param("endTime") LocalDateTime endTime);

    // Vérifie si un patient a déjà un rendez-vous à une date donnée
    @Query("SELECT CASE WHEN COUNT(a) > 0 THEN true ELSE false END " +
            "FROM Appointment a " +
            "WHERE a.patient.id = :patientId " +
            "AND a.status <> com.team48.clinic_management_backend.entities.AppointmentStatus.CANCELLED " +
            "AND FUNCTION('DATE', a.starTime) = :date")
    boolean existsPatientAppointmentOnDate(@Param("patientId") Long patientId,
                                           @Param("date") LocalDate date);

    // Récupère les rendez-vous d'un médecin pour une date donnée (avec jointure)
    @Query("SELECT a FROM Appointment a " +
            "LEFT JOIN FETCH a.doctor d " +
            "LEFT JOIN FETCH a.patient p " +
            "WHERE d.id = :doctorId " +
            "AND FUNCTION('DATE', a.starTime) = :date " +
            "AND a.status <> com.team48.clinic_management_backend.entities.AppointmentStatus.CANCELLED " +
            "ORDER BY a.starTime ASC")
    List<Appointment> findByDoctorIdAndDate(@Param("doctorId") Long doctorId,
                                            @Param("date") LocalDate date);
}