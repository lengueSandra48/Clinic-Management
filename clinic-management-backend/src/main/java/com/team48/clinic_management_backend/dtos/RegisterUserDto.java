package com.team48.clinic_management_backend.dtos;

import lombok.Data;

@Data
public class RegisterUserDto {
    private String email;
    private String password;
    private String fullName;
}
