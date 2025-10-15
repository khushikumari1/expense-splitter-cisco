# 💰 Expense Splitter

A smart, user-friendly web application for splitting expenses among groups. Perfect for roommates, travel companions, and friend groups who want to settle bills fairly and efficiently.

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

## ✨ Features

- 👥 **Participant Management** - Add, edit, and remove participants
- 💵 **Flexible Expense Tracking** - Record expenses with multiple split methods
- 🔄 **Smart Settlement Calculation** - Automatically calculates who owes whom with minimal transactions
- 📊 **Real-time Balance Updates** - See balances update instantly as you add expenses
- 💾 **Local Storage** - Your data is saved automatically in your browser
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- ✅ **Input Validation** - Prevents errors with comprehensive validation
- 🎨 **Clean UI** - Intuitive interface with modern design

## 🚀 Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.x or higher)
- npm (v9.x or higher)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/khushikumari1/expense-splitter-cisco
   cd expense-splitter-cisco
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the application**

   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   Navigate to http://localhost:3000
   ```

## 📖 Usage Guide

### 1. Add Participants

Start by adding all the people who will be sharing expenses:

- Click "Add Participant"
- Enter participant name
- Repeat for all group members

### 2. Record Expenses

Add expenses as they occur:

- Enter expense description (e.g., "Dinner at Italian Restaurant")
- Enter amount
- Select who paid
- Choose split method:
  - **Equal Split** - Divide evenly among selected participants
  - **Custom Split** - Specify exact amounts for each person
  - **Percentage Split** - Allocate by percentage
- Select participants involved in the expense

### 3. View Settlements

The app automatically calculates optimal settlements:

- See individual balances (who's owed money vs. who owes)
- View settlement summary with minimal transactions
- Check detailed breakdown of all expenses

### 4. Export Results

- Generate a summary report
- Share settlement details with your group
- Keep records for future reference

## 💡 Example Scenario

**Weekend Trip with Friends:**

```
Participants: Alice, Bob, Charlie, Diana

Expenses:
1. Hotel ($400) - Alice paid, split equally
2. Dinner ($150) - Bob paid, split equally
3. Breakfast ($50) - Charlie paid, split equally
4. Gas ($60) - Diana paid, split equally

Result:
- Total spent: $660
- Per person: $165
- Alice receives: $235 (paid $400, owes $165)
- Bob receives: $15 (paid $150, owes $165)
- Charlie owes: $115 (paid $50, owes $165)
- Diana owes: $105 (paid $60, owes $165)

Optimal Settlements:
1. Charlie pays Alice $115
2. Diana pays Alice $105
3. Bob pays Alice $15
```

## 🛠️ Technology Stack

- **Frontend Framework:** React.js
- **Language:** JavaScript (ES6+)
- **Styling:** CSS3 / CSS Modules
- **State Management:** React Hooks (useState, useContext)
- **Storage:** localStorage API
- **Testing:** Jest, React Testing Library
- **Build Tool:** Vite / Create React App
- **Package Manager:** npm

## 📂 Project Structure

```
expense-splitter-cisco/
├── src/
│   ├── components/           # React components
│   │   ├── ParticipantManager/
│   │   │   ├── ParticipantList.jsx
│   │   │   └── ParticipantForm.jsx
│   │   ├── ExpenseManager/
│   │   │   ├── ExpenseForm.jsx
│   │   │   ├── ExpenseList.jsx
│   │   │   └── ExpenseDetail.jsx
│   │   └── SettlementDashboard/
│   │       ├── BalanceOverview.jsx
│   │       └── SettlementSummary.jsx
│   ├── utils/                # Utility functions
│   │   ├── calculations.js   # Settlement algorithms
│   │   └── validation.js     # Input validation
│   ├── hooks/                # Custom React hooks
│   ├── context/              # React Context for state
│   ├── App.jsx               # Main application component
│   └── index.js              # Entry point
├── tests/                    # Test files
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── public/                   # Static assets
├── package.json
└── README.md
```

## 🧪 Testing

Run the test suite:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

**Test Coverage:**

- Unit Tests: 45+ test cases
- Integration Tests: Full user flow coverage
- Edge Cases: Comprehensive edge case handling
- Coverage: ~85% of core logic

## 🎯 Key Algorithms

### Settlement Calculation

The app uses an optimized **min-heap based algorithm** to minimize the number of transactions:

1. Calculate net balance for each participant
2. Separate creditors (positive balance) and debtors (negative balance)
3. Use priority queue to match largest amounts
4. Generate minimal transaction list

**Time Complexity:** O(n log n)  
**Space Complexity:** O(n)

### Validation Rules

- ✅ Amounts must be positive and ≤ 2 decimal places
- ✅ Participant names: 2-50 characters, no duplicates
- ✅ Custom splits must sum to 100% (±0.01 tolerance)
- ✅ At least 2 participants required for splitting
- ✅ Floating-point precision handled correctly

## 🤝 AI-Assisted Development

This project was developed using a hybrid AI-assisted approach:

- **ChatGPT**: Used for problem decomposition, architecture design, and flow planning
- **Google Gemini**: Used for code generation based on design specifications
- **Manual Development**: Validation logic, testing, edge case handling, and UI/UX refinements

**AI Contribution:** ~50% (architecture, initial code)  
**Human Contribution:** ~50% (testing, validation, integration, polish)

### Development Philosophy

1. AI for rapid prototyping and boilerplate code
2. Human oversight for business logic and edge cases
3. Iterative refinement combining AI suggestions with manual improvements
4. Comprehensive testing to ensure production quality

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory (optional):

```env
REACT_APP_MAX_PARTICIPANTS=50
REACT_APP_MAX_AMOUNT=1000000
REACT_APP_CURRENCY_SYMBOL=$
```

### Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📱 Features in Detail

### Split Methods

1. **Equal Split**

   - Divides amount equally among all selected participants
   - Handles fractional cents fairly
   - Example: $100 ÷ 3 = $33.33, $33.33, $33.34

2. **Custom Split**

   - Specify exact amount for each participant
   - Validation ensures total matches expense amount
   - Useful for unequal contributions

3. **Percentage Split**
   - Allocate by percentage (e.g., 40%, 30%, 30%)
   - Auto-validates percentages sum to 100%
   - Ideal for proportional sharing

### Settlement Optimization

The app minimizes transactions using graph-based algorithms:

**Before Optimization:**

- A owes B $50
- B owes C $50
- C owes A $50
- Total: 3 transactions

**After Optimization:**

- No transactions needed (circular debt cancels out)
- Total: 0 transactions

## 🚧 Roadmap

### Planned Features

- [ ] Multi-currency support with live exchange rates
- [ ] Expense categories and analytics
- [ ] Export to PDF/Excel
- [ ] Group management (multiple expense groups)
- [ ] Payment integration (Venmo, PayPal, UPI)
- [ ] Dark mode
- [ ] Recurring expenses
- [ ] Email notifications for settlements
- [ ] Mobile app (React Native)
- [ ] Backend sync with cloud storage

## 🐛 Known Issues

- localStorage has browser-specific limits (~5-10MB)
- No cloud sync between devices
- Single currency support only (v1.0)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Write tests for new features
- Follow existing code style
- Update documentation
- Ensure all tests pass before submitting PR

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Khushi Kumari**

- GitHub: [@khushikumari1](https://github.com/khushikumari1)
- LinkedIn: [Your LinkedIn Profile](https://linkedin.com/in/yourprofile)
- Email: your.email@example.com

## 🙏 Acknowledgments

- AI Tools: ChatGPT (OpenAI) and Gemini (Google) for development assistance
- React community for excellent documentation and libraries
- All contributors and testers

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/khushikumari1/expense-splitter-cisco/issues) page
2. Create a new issue with detailed description
3. Contact the author directly

## ⭐ Show Your Support

If you find this project helpful, please give it a ⭐️ on GitHub!

---
