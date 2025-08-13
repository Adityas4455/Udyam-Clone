const formSchema = [
  {
    name: 'aadhaar',
    label: 'Aadhaar Number',
    type: 'text',
    pattern: '^\\d{12}$',
    placeholder: 'Enter 12-digit Aadhaar',
    required: true,
  },
  {
    name: 'otp',
    label: 'OTP',
    type: 'text',
    pattern: '^\\d{6}$',
    placeholder: 'Enter 6-digit OTP',
    required: true,
  },
  {
    name: 'pan',
    label: 'PAN Number',
    type: 'text',
    pattern: '^[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}$',
    placeholder: 'ABCDE1234F',
    required: true,
  },
]
export default formSchema