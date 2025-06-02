package com.team48.clinic_management_backend.dtos;

import lombok.Data;

@Data
public class LoginUserDto {
    private String email;
    private String password;
}
