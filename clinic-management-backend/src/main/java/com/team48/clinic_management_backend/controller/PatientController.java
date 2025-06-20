package com.team48.clinic_management_backend.controller;

import com.team48.clinic_management_backend.dtos.PatientCreationDTO;
import com.team48.clinic_management_backend.dtos.PatientResponseDTO;
import com.team48.clinic_management_backend.services.PatientService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.http.HttpStatus.*;

@RestController
@RequestMapping("/api/patients")
@RequiredArgsConstructor
@SecurityRequirement(name = "bearerAuth") // 👈 This enables the lock icon in Swagger
@Tag(name = "patients", description = "Manage patient")
public class PatientController {
    private final PatientService patientService;

    @PostMapping("/create")
    @Operation(security = { @SecurityRequirement(name = "bearerAuth") })
    @PreAuthorize("hasRole('SECRETARY')")
    public ResponseEntity<PatientResponseDTO> createPatient(
            @Valid @RequestBody PatientCreationDTO dto) {
        try {
            PatientResponseDTO createdPatient = patientService.createPatient(dto);
            return ResponseEntity.status(CREATED).body(createdPatient);
        } catch (Exception e) {
            // Add logging here
            return ResponseEntity.internalServerError().build();
        }
    }
}