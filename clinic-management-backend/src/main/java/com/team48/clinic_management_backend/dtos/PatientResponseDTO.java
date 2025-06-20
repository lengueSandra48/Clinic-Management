package com.team48.clinic_management_backend.dtos;

public record PatientResponseDTO(
        Long id,
        String fullName,
        String phone,
        String insuranceId
) {}