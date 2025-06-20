package com.team48.clinic_management_backend.controller;

import com.team48.clinic_management_backend.dtos.AppointmentCreationDTO;
import com.team48.clinic_management_backend.dtos.AppointmentDTO;
import com.team48.clinic_management_backend.services.AppointmentService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

import static org.springframework.http.HttpStatus.*;

@RestController
@RequestMapping("/api/appointments")
@RequiredArgsConstructor
@SecurityRequirement(name = "bearerAuth") // 👈 This enables the lock icon in Swagger
@Tag(name = "Appointments", description = "Manage medical appointments")
public class AppointmentController {
    private final AppointmentService appointmentService;

    @PostMapping("/create")
    @PreAuthorize("hasRole('SECRETARY')")
    public ResponseEntity<AppointmentDTO> createAppointment(
            @Valid @RequestBody AppointmentCreationDTO dto,
            @AuthenticationPrincipal UserDetails userDetails) {

        String secretaryEmail = userDetails.getUsername();
        AppointmentDTO created = appointmentService.createAppointment(dto, secretaryEmail);
        return ResponseEntity.status(CREATED).body(created);
    }

    @PutMapping("/{id}/cancel")
    @PreAuthorize("hasAnyRole('SECRETARY', 'ADMIN')")
    public ResponseEntity<Void> cancelAppointment(
            @PathVariable Long id,
            @RequestParam String reason) {

        appointmentService.cancelAppointment(id, reason);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/doctor/{doctorId}")
    @PreAuthorize("hasAnyRole('DOCTOR', 'SECRETARY', 'ADMIN')")
    public ResponseEntity<List<AppointmentDTO>> getDoctorAppointments(
            @PathVariable Long doctorId,
            @RequestParam LocalDate date) {

        return ResponseEntity.ok(appointmentService.getByDoctorAndDate(doctorId, date));
    }
}