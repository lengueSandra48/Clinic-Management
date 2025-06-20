package com.team48.clinic_management_backend.repositories;

import com.team48.clinic_management_backend.entities.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {
}
