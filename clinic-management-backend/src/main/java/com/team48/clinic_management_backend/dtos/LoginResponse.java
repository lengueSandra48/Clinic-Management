package com.team48.clinic_management_backend.dtos;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LoginResponse {
    private String token;
    private long expiresIn;

}
