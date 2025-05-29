package com.team48.clinic_management_backend.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
//@Table(name = "doctors")
@Data
@PrimaryKeyJoinColumn(name = "user_id")
public class Doctor extends User{
    private String specialization;
    private String licenceNumber;

    @OneToMany(mappedBy = "doctor", cascade = CascadeType.ALL)
    private List<Appointment> appointments;
}
