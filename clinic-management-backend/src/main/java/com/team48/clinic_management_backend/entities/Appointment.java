package com.team48.clinic_management_backend.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
//@Table(name = "appointments")
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDateTime starTime;
    @Column(nullable = false)
    private LocalDateTime endTime;

    private String cancellationReason;

    @Enumerated(EnumType.STRING)
    private AppointmentStatus status;
    private String notes;

    @ManyToOne
    private Patient patient;
    @ManyToOne
    private Doctor doctor;


}
