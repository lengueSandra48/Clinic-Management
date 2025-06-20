package com.team48.clinic_management_backend.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record PatientCreationDTO(
        @NotBlank(message = "Le nom complet est obligatoire")
        String fullName,

        @Pattern(regexp = "^\\+?[0-9]{8,15}$", message = "Numéro de téléphone invalide")
        String phone,

        @NotBlank(message = "L'identifiant d'assurance est obligatoire")
        String insuranceId
) {}
