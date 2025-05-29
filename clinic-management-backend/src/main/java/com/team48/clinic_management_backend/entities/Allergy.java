package com.team48.clinic_management_backend.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
//@Table(name = "allergies")
@Data
@AllArgsConstructor @NoArgsConstructor
public class Allergy {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;  // e.g., "Penicillin", "Pollen"

    private String severity;  // e.g., "Mild", "Severe"
    private String reaction;  // e.g., "Rash", "Anaphylaxis"

    @ManyToOne
    @JoinColumn(name = "medical_record_id", nullable = false)
    private MedicalRecords medicalRecord;
}