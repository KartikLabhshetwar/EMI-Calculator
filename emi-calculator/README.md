# EMI Calculator

A responsive and interactive EMI (Equated Monthly Installment) calculator built with React and Bootstrap.

## Features

- Calculate EMI based on loan amount, interest rate, and loan tenure
- Display monthly EMI, total interest payable, and total amount payable
- Show impact of prepayment on loan tenure and interest saved
- Provide a monthly breakdown of payments
- Responsive design for both desktop and mobile devices
- Dark mode toggle for better user experience in different lighting conditions
- Print/Save functionality to export calculation results as PDF

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)

## Installation

To install the EMI Calculator, follow these steps:

1. Clone the repository:
   ```
   git clone https://github.com/your-username/emi-calculator.git
   ```

2. Navigate to the project directory:
   ```
   cd emi-calculator
   ```

3. Install the dependencies:
   ```
   npm install
   ```

## Running the Project Locally

To run the EMI Calculator locally, follow these steps:

1. In the project directory, run:
   ```
   npm run dev
   ```

2. Open your browser and visit `http://localhost:5173`

The page will reload if you make edits. You will also see any lint errors in the console.

## Building for Production

To build the app for production, run:

```
npm run build
```


This builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

## Additional Features Implemented

1. **Dark Mode**: Users can toggle between light and dark themes for better visibility in different environments.

2. **Print/Save Functionality**: Users can print the EMI calculation results or save them as a PDF.

3. **Prepayment Impact**: The calculator shows how prepayments affect the loan tenure and total interest saved.

4. **Responsive Design**: The application is fully responsive and works well on both desktop and mobile devices.

5. **Form Validation**: Input fields are validated to ensure correct data entry.

6. **Monthly Breakdown**: A detailed month-by-month breakdown of the loan repayment is provided.

## Technologies Used

- React
- Bootstrap
- react-to-print (for print functionality)
- CSS3 for custom styling

## Contributing

Contributions to the EMI Calculator are welcome. Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.