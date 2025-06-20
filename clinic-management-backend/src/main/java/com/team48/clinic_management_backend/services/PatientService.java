package com.team48.clinic_management_backend.services;

import com.team48.clinic_management_backend.dtos.PatientCreationDTO;
import com.team48.clinic_management_backend.dtos.PatientResponseDTO;
import com.team48.clinic_management_backend.entities.Patient;
import com.team48.clinic_management_backend.exceptions.BusinessException;
import com.team48.clinic_management_backend.repositories.PatientRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Transactional
public class PatientService {
    private final PatientRepository patientRepository;


    public PatientResponseDTO createPatient(PatientCreationDTO dto) {
        if (patientRepository.existsByInsuranceId(dto.insuranceId())) {
            throw new BusinessException("Un patient avec cet identifiant d'assurance existe déjà");
        }

        Patient patient = new Patient();
        patient.setFullName(dto.fullName());
        patient.setPhone(dto.phone());
        patient.setInsuranceId(dto.insuranceId());

        Patient savedPatient = patientRepository.save(patient);
        return mapToDTO(savedPatient);
    }

    private PatientResponseDTO mapToDTO(Patient patient) {
        return new PatientResponseDTO(
                patient.getId(),
                patient.getFullName(),
                patient.getPhone(),
                patient.getInsuranceId()
        );
    }
}