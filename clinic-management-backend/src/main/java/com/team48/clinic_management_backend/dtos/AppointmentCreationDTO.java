package com.team48.clinic_management_backend.dtos;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class AppointmentCreationDTO {
    @NotNull
    @Future
    private LocalDateTime startTime;

    @NotNull
    @Future
    private LocalDateTime endTime;

    @NotNull
    private Long doctorId;

    @NotNull
    private Long patientId;

    @Size(max = 500, message = "Les notes ne doivent pas dépasser 500 caractères")
    private String notes;


}
