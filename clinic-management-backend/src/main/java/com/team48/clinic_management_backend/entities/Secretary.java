package com.team48.clinic_management_backend.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
//@Table(name = "secretaries")
@Data
@AllArgsConstructor @NoArgsConstructor
@PrimaryKeyJoinColumn(name = "user_id")
public class Secretary extends User {
    private String department;

}
