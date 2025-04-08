import React, { useState, useEffect } from "react";
import Web3 from "web3";
import "./App.css";

const CONTRACT_ADDRESS = "0x9D7f74d0C41E726EC95884E0e97Fa6129e3b5E99";


const contractABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "patient",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "doctorName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "timing",
				"type": "string"
			}
		],
		"name": "addAppointment",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "patientAppointments",
		"outputs": [
			{
				"internalType": "string",
				"name": "doctorName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "timing",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "patientHealthData",
		"outputs": [
			{
				"internalType": "string",
				"name": "notes",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "patientMedicines",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "purchased",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "patientPayments",
		"outputs": [
			{
				"internalType": "bool",
				"name": "paid",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "patientTreatmentHistory",
		"outputs": [
			{
				"internalType": "string",
				"name": "diagnosis",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "treatmentGiven",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "date",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "patient",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "medName",
				"type": "string"
			}
		],
		"name": "prescribeMedicine",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "patient",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "notes",
				"type": "string"
			}
		],
		"name": "recordHealthData",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "patient",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "diagnosis",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "treatmentGiven",
				"type": "string"
			}
		],
		"name": "recordTreatment",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "enum MedicalRecords.Role",
				"name": "_role",
				"type": "uint8"
			}
		],
		"name": "register",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "patient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "purchased",
				"type": "bool"
			}
		],
		"name": "updateMedicinePurchase",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "patient",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "status",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "updatePaymentStatus",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "userProfiles",
		"outputs": [
			{
				"internalType": "enum MedicalRecords.Role",
				"name": "role",
				"type": "uint8"
			},
			{
				"internalType": "address",
				"name": "userAddress",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "viewAppointments",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "doctorName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "timing",
						"type": "string"
					}
				],
				"internalType": "struct MedicalRecords.Appointment[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "viewHealthData",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "notes",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "timestamp",
						"type": "uint256"
					}
				],
				"internalType": "struct MedicalRecords.HealthData[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "viewMedicines",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "bool",
						"name": "purchased",
						"type": "bool"
					}
				],
				"internalType": "struct MedicalRecords.Medicine[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "viewPaymentStatus",
		"outputs": [
			{
				"components": [
					{
						"internalType": "bool",
						"name": "paid",
						"type": "bool"
					},
					{
						"internalType": "uint256",
						"name": "amount",
						"type": "uint256"
					}
				],
				"internalType": "struct MedicalRecords.Payment",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "viewTreatmentHistory",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "diagnosis",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "treatmentGiven",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "date",
						"type": "uint256"
					}
				],
				"internalType": "struct MedicalRecords.Treatment[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

const Healthcare = () => {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [role, setRole] = useState(""); // "patient", "doctor", "pharmacist"
  const [patientAddress, setPatientAddress] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [medicine, setMedicine] = useState("");
  const [records, setRecords] = useState([]);
  const [recordIndex, setRecordIndex] = useState("");

  useEffect(() => {
    const loadBlockchainData = async () => {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);

        const instance = new web3.eth.Contract(contractABI, CONTRACT_ADDRESS);
        setContract(instance);
      } else {
        alert("Please install MetaMask to continue!");
      }
    };

    loadBlockchainData();
  }, []);

  const addRecord = async () => {
    await contract.methods
      .addRecord(patientAddress, diagnosis, medicine)
      .send({ from: account });
    alert("Record added!");
  };

  const fetchRecords = async () => {
    const result = await contract.methods.getRecords(patientAddress).call();
    setRecords(result);
  };

  const markAsPaid = async () => {
    await contract.methods
      .markPaid(patientAddress, recordIndex)
      .send({ from: account });
    alert("Marked as paid");
  };

  return (
    <div className="healthcare">
      <div className="role-select">
        <h3>Select your role:</h3>
        <button onClick={() => setRole("patient")}>Patient</button>
        <button onClick={() => setRole("doctor")}>Doctor</button>
        <button onClick={() => setRole("pharmacist")}>Pharmacist</button>
      </div>

      {role === "doctor" && (
        <div className="form-box">
          <h3>👨‍⚕️ Add Medical Record</h3>
          <input
            type="text"
            placeholder="Patient Address"
            onChange={(e) => setPatientAddress(e.target.value)}
          />
          <input
            type="text"
            placeholder="Diagnosis"
            onChange={(e) => setDiagnosis(e.target.value)}
          />
          <input
            type="text"
            placeholder="Prescribed Medicine"
            onChange={(e) => setMedicine(e.target.value)}
          />
          <button onClick={addRecord}>Add Record</button>
        </div>
      )}

      {(role === "patient" || role === "doctor" || role === "pharmacist") && (
        <div className="form-box">
          <h3>📋 View Records</h3>
          <input
            type="text"
            placeholder="Patient Address"
            onChange={(e) => setPatientAddress(e.target.value)}
          />
          <button onClick={fetchRecords}>Get Records</button>

          <ul>
            {records.map((r, index) => (
              <li key={index}>
                <strong>Diagnosis:</strong> {r.diagnosis}, <strong>Medicine:</strong>{" "}
                {r.prescribedMedicine}, <strong>Doctor:</strong> {r.doctor},{" "}
                <strong>Status:</strong> {r.isPaid ? "Paid" : "Unpaid"}
              </li>
            ))}
          </ul>
        </div>
      )}

      {role === "pharmacist" && (
        <div className="form-box">
          <h3>💊 Mark Prescription as Paid</h3>
          <input
            type="text"
            placeholder="Patient Address"
            onChange={(e) => setPatientAddress(e.target.value)}
          />
          <input
            type="number"
            placeholder="Record Index"
            onChange={(e) => setRecordIndex(e.target.value)}
          />
          <button onClick={markAsPaid}>Mark Paid</button>
        </div>
      )}
    </div>
  );
};

export default Healthcare;
