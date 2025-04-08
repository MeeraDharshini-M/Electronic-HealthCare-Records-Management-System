// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract MedicalRecords {

    enum Role { None, Patient, Doctor, Pharmacist }

    struct Medicine {
        string name;
        bool purchased;
    }

    struct Appointment {
        string doctorName;
        string timing;
    }

    struct Treatment {
        string diagnosis;
        string treatmentGiven;
        uint date;
    }

    struct HealthData {
        string notes;
        uint timestamp;
    }

    struct Payment {
        bool paid;
        uint amount;
    }

    struct UserProfile {
        Role role;
        address userAddress;
    }

    mapping(address => UserProfile) public userProfiles;
    mapping(address => Medicine[]) public patientMedicines;
    mapping(address => Appointment[]) public patientAppointments;
    mapping(address => Treatment[]) public patientTreatmentHistory;
    mapping(address => HealthData[]) public patientHealthData;
    mapping(address => Payment) public patientPayments;

    // Modifier to check roles
    modifier onlyRole(Role _role) {
        require(userProfiles[msg.sender].role == _role, "Access denied: Invalid role");
        _;
    }

    // Register users with a role
    function register(Role _role) public {
        require(userProfiles[msg.sender].role == Role.None, "Already registered");
        userProfiles[msg.sender] = UserProfile(_role, msg.sender);
    }

    // Doctor-only functions
    function addAppointment(address patient, string memory doctorName, string memory timing) public onlyRole(Role.Doctor) {
        patientAppointments[patient].push(Appointment(doctorName, timing));
    }

    function prescribeMedicine(address patient, string memory medName) public onlyRole(Role.Doctor) {
        patientMedicines[patient].push(Medicine(medName, false));
    }

    function recordTreatment(address patient, string memory diagnosis, string memory treatmentGiven) public onlyRole(Role.Doctor) {
        patientTreatmentHistory[patient].push(Treatment(diagnosis, treatmentGiven, block.timestamp));
    }

    function recordHealthData(address patient, string memory notes) public onlyRole(Role.Doctor) {
        patientHealthData[patient].push(HealthData(notes, block.timestamp));
    }

    // Pharmacist-only functions
    function updatePaymentStatus(address patient, bool status, uint amount) public onlyRole(Role.Pharmacist) {
        patientPayments[patient] = Payment(status, amount);
    }

    function updateMedicinePurchase(address patient, uint index, bool purchased) public onlyRole(Role.Pharmacist) {
        require(index < patientMedicines[patient].length, "Invalid index");
        patientMedicines[patient][index].purchased = purchased;
    }

    // Patient read-only functions
    function viewMedicines() public view onlyRole(Role.Patient) returns (Medicine[] memory) {
        return patientMedicines[msg.sender];
    }

    function viewAppointments() public view onlyRole(Role.Patient) returns (Appointment[] memory) {
        return patientAppointments[msg.sender];
    }

    function viewTreatmentHistory() public view onlyRole(Role.Patient) returns (Treatment[] memory) {
        return patientTreatmentHistory[msg.sender];
    }

    function viewHealthData() public view onlyRole(Role.Patient) returns (HealthData[] memory) {
        return patientHealthData[msg.sender];
    }

    function viewPaymentStatus() public view onlyRole(Role.Patient) returns (Payment memory) {
        return patientPayments[msg.sender];
    }
}

//0x9D7f74d0C41E726EC95884E0e97Fa6129e3b5E99
