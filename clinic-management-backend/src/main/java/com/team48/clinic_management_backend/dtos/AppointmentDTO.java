package com.team48.clinic_management_backend.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class AppointmentDTO {
    private Long id;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private String status;
    private String doctorName;
    private String doctorSpecialization;
    private String patientName;
    private String patientInsuranceId;
    private String notes;
    private String cancellationReason;

}
