package com.team48.clinic_management_backend.services;

import com.team48.clinic_management_backend.entities.Bill;
import org.springframework.stereotype.Service;

@Service
public class PDFService {
    public byte[] generateInvoicePDF(Bill bill) {
        // Use Apache PDFBox/iText to generate PDF
        // Example: bill.getAppointment().getPatient().getName(), etc.
        return new byte[0];
    }
}