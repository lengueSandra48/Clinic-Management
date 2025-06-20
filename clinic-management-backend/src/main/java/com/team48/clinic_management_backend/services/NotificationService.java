package com.team48.clinic_management_backend.services;

import com.team48.clinic_management_backend.entities.Doctor;
import com.team48.clinic_management_backend.entities.Patient;
import org.springframework.stereotype.Service;

@Service
public class NotificationService {
    public void notifyDoctor(Doctor doctor, String nouveau_rdv_programmé) {
    }

    public void notifyPatient(Patient patient, String confirmation_de_rdv) {
    }
}
