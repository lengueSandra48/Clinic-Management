package com.team48.clinic_management_backend.repositories;

import com.team48.clinic_management_backend.entities.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PatientRepository extends JpaRepository<Patient, Long> {
    boolean existsByInsuranceId(String insuranceId);
}
