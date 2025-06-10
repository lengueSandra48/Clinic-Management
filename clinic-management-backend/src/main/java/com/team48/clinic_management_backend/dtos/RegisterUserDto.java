package com.team48.clinic_management_backend.dtos;

import lombok.Data;

import java.util.List;

@Data
public class RegisterUserDto {
    private String email;
    private String password;
    private String fullName;
    private List<String> roles;
}
