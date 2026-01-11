import React, { useState } from 'react';
import { User, CreditCard, ChevronDown, X, Check, Shield, Search, Hand, Lock, ArrowLeft, Wallet, Image as ImageIcon } from 'lucide-react';

// Mascot State Constants
const MASCOT_STATES = {
  TRANSFER: 'TRANSFER', // NEW: Transfer input scenario
  SAFE: 'SAFE',
  CAUTION: 'CAUTION',
  WARNING: 'WARNING',
  PRESSURE: 'PRESSURE',
  BLOCKED: 'BLOCKED'
};

function App() {
  const [selectedScenario, setSelectedScenario] = useState(MASCOT_STATES.TRANSFER);
  const [showIntervention, setShowIntervention] = useState(false);
  const [userConfirmedCaution, setUserConfirmedCaution] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);
  const [showSuccessSlip, setShowSuccessSlip] = useState(false);

  // Input page state (for TRANSFER scenario)
  const [transferAmount, setTransferAmount] = useState('0.00');
  const [enableESlipCustomization, setEnableESlipCustomization] = useState(false);

  // Transaction Details
  const transaction = {
    senderName: 'MR. THAI USER',
    senderAccount: 'xxx-2-x3990-x',
    recipientName: 'MS. RATTANA DEE',
    recipientAccount: 'KBANK • 405-2-xxxx-1',
    amount: '15,000.00',
    bank: 'KBANK'
  };

  // Hong Yok Bird Messages for Each Scenario (Customize this!)
  const birdMessages = {
    // Review Transaction Screen (Default - shown on every page)

    // SAFE Scenario - Green Bird
    [MASCOT_STATES.SAFE]: {
      title: 'การโอนเงินนี้ปลอดภัย',
      message: 'หากคุณมั่นใจ สามารถดำเนินการต่อได้เลยค่ะ',
      birdImagePath:'/images/green-bird.png'  //
    },
    // CAUTION Scenario - Yellow Bird
    [MASCOT_STATES.CAUTION]: {
      title: 'เตือนเบาๆ',
      message: ' รายการโอนนี้มีบางอย่างแตกต่างจากการใช้งานปกติของคุณ',
      birdImagePath: '/images/yellow-bird.png'
    },
    // WARNING Scenario - Orange Bird
    [MASCOT_STATES.WARNING]: {
      title: 'พบความเสี่ยงสูง',
      message: 'น้องเจอสัญญาณเตือนหลายอย่างเลยค่ะ ขอให้โทรถามคนที่จะโอนให้ หรือปรึกษาคนในครอบครัวก่อนนะคะ ถ้าเป็นเรื่องจริง รอได้แน่นอนค่ะ',
      birdImagePath: '/images/orange-bird.png'
    },
    // PRESSURE Scenario - Tied Bird
    [MASCOT_STATES.PRESSURE]: {
      title: 'ค่อยๆ คิด ไม่ต้องรีบ',
      message: 'น้องหงส์หยกสังเกตว่าคุณกดเร็วผิดปกติ 🤔 มีใครเร่งให้โอนหรือเปล่าคะ? มิจฉาชีพชอบใช้เทคนิคนี้มากเลย หายใจลึกๆ คิดใหม่อีกทีนะคะ',
      birdImagePath: '/images/tied-bird.png'
    },
    // BLOCKED Scenario - Red Bird
    [MASCOT_STATES.BLOCKED]: {
      title: '⚠️ ธุรกรรมนี้มีความเสี่ยงสูงมาก',
      message: 'ระบบตรวจพบความผิดปกติ หากโอนไปแล้วอาจเรียกคืนได้ยาก กรุณาติดต่อธนาคารก่อนดำเนินการค่ะ',
      birdImagePath: '/images/red-bird.png'
    }
  };

  // Default bird for transfer page
  const defaultTransferBird = {
    title: '💡 ทำรายการอย่างปลอดภัย',
    message: 'รู้หรือไม่: มิจฉาชีพมืออาชีพใช้เวลาเฉลี่ย 18 นาทีในการหลอก - ถ้ารู้สึกถูกเร่ง หยุด 5 นาที โทรหาคนที่ไว้ใจ',
    birdImagePath: '/images/hongyok.png' // Using hongyok.png for now
  };

  const handleConfirmClick = () => {
    // Skip intervention overlay for SAFE, CAUTION and WARNING - user confirms directly from main page
    if (selectedScenario === MASCOT_STATES.SAFE || selectedScenario === MASCOT_STATES.CAUTION || selectedScenario === MASCOT_STATES.WARNING) {
      setShowSuccessSlip(true);
      return;
    }

    setShowIntervention(true);
  };

  const handleCautionConfirm = () => {
    setUserConfirmedCaution(true);
    setTimeout(() => {
      setShowSuccessSlip(true);
    }, 1000);
  };

  const handleSliderChange = (e) => {
    setSliderValue(e.target.value);
    if (e.target.value >= 95) {
      setTimeout(() => {
        setShowSuccessSlip(true);
      }, 500);
    }
  };

  const handlePressureResponse = (isRushed) => {
    if (isRushed) {
      alert('Transfer cancelled for your safety.');
      resetApp();
    } else {
      setTimeout(() => {
        setShowSuccessSlip(true);
      }, 1000);
    }
  };

  const resetApp = () => {
    setShowIntervention(false);
    setUserConfirmedCaution(false);
    setSliderValue(0);
    setShowSuccessSlip(false);
    setTransferAmount('0.00');
    setEnableESlipCustomization(false);
  };

  // Mascot State Configurations
  const mascotConfig = {
    [MASCOT_STATES.SAFE]: {
      color: 'bg-green-100',
      borderColor: 'border-green-500',
      icon: Shield,
      iconColor: 'text-green-600',
      placeholder: 'GREEN BIRD',
      message: 'Analysis Complete',
      subtitle: 'Transfer Safe. Proceeding...'
    },
    [MASCOT_STATES.CAUTION]: {
      color: 'bg-yellow-100',
      borderColor: 'border-yellow-500',
      icon: Search,
      iconColor: 'text-yellow-600',
      placeholder: 'YELLOW BIRD',
      message: 'First Time Transfer',
      subtitle: 'You have never transferred to Ms. Rattana Dee before. Please check the account number carefully.'
    },
    [MASCOT_STATES.WARNING]: {
      color: 'bg-orange-100',
      borderColor: 'border-orange-500',
      icon: Hand,
      iconColor: 'text-orange-600',
      placeholder: 'ORANGE BIRD',
      message: 'High Risk Detected',
      subtitle: 'Recipient IP located in Cambodia.'
    },
    [MASCOT_STATES.PRESSURE]: {
      subtitle: 'Are you being rushed to make this transfer?'
    },
    [MASCOT_STATES.BLOCKED]: {
      color: 'bg-red-100',
      borderColor: 'border-red-500',
      icon: Lock,
      iconColor: 'text-red-600',
      placeholder: 'RED BIRD',
      message: 'Transfer Blocked',
      subtitle: 'Destination is a blacklisted mule account.'
    }
  };

  const currentConfig = mascotConfig[selectedScenario];

  // Success Slip Page
  if (showSuccessSlip) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-teal-700 to-teal-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-500 rounded-full mx-auto flex items-center justify-center mb-4">
            <Check className="w-12 h-12 text-white" strokeWidth={3} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Transfer Successful</h2>
          <p className="text-gray-600 mb-6">Your transaction has been completed.</p>
          <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Amount</span>
              <span className="font-bold text-gray-800">฿{transaction.amount}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">To</span>
              <span className="font-bold text-gray-800">{transaction.recipientName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Account</span>
              <span className="font-bold text-gray-800">{transaction.recipientAccount}</span>
            </div>
          </div>
          <button
            onClick={resetApp}
            className="w-full bg-teal-600 text-white py-3 rounded-full font-semibold hover:bg-teal-700 transition"
          >
            Done
          </button>
        </div>
      </div>
    );
  }

  // TRANSFER Scenario - Input Page (NEW)
  if (selectedScenario === MASCOT_STATES.TRANSFER) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative flex flex-col">
        {/* Debug Scenario Selector */}
        <div className="bg-[#3d4f5c] text-white p-2 flex gap-2 flex-wrap justify-between items-center px-3">
          <span className="text-[10px] font-semibold text-[#f5a623] uppercase tracking-wide">Dev Mode</span>
          <div className="flex gap-1.5 flex-wrap">
            {Object.values(MASCOT_STATES).map((state) => (
              <button
                key={state}
                onClick={() => {
                  setSelectedScenario(state);
                  resetApp();
                }}
                className={`px-2.5 py-1.5 rounded-md text-xs font-semibold transition-all ${
                  selectedScenario === state
                    ? state === MASCOT_STATES.TRANSFER ? 'bg-blue-500 text-white shadow-md' :
                      state === MASCOT_STATES.SAFE ? 'bg-white text-gray-900 shadow-md' :
                      state === MASCOT_STATES.CAUTION ? 'bg-[#c89a3f] text-white shadow-md' :
                      state === MASCOT_STATES.WARNING ? 'bg-[#e67e22] text-white shadow-md' :
                      state === MASCOT_STATES.PRESSURE ? 'bg-[#9b59b6] text-white shadow-md' :
                      'bg-[#c0392b] text-white shadow-md'
                    : 'bg-gray-600 hover:bg-gray-500 text-gray-200'
                }`}
              >
                {state === MASCOT_STATES.TRANSFER && 'โอนเงิน'}
                {state === MASCOT_STATES.SAFE && 'Safe'}
                {state === MASCOT_STATES.CAUTION && 'Caution'}
                {state === MASCOT_STATES.WARNING && 'Warn'}
                {state === MASCOT_STATES.PRESSURE && 'Rush'}
                {state === MASCOT_STATES.BLOCKED && 'Critical'}
              </button>
            ))}
          </div>
        </div>

        {/* Header */}
        <div className="bg-gradient-to-b from-[#3d4f5c] to-[#2c3e4f] text-white px-4 py-4">
          <div className="flex items-center gap-3">
            <button onClick={resetApp} className="hover:bg-white/10 rounded-full p-1 transition">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-semibold">โอนเงิน</h1>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center px-4 py-4 overflow-auto">
          <div className="w-full max-w-md">
            {/* From Account Section - Compact */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 mb-4 shadow-md border border-blue-100">
            <p className="text-xs text-gray-500 mb-2">From:</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center shadow-md">
                  <User className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{transaction.senderName}</p>
                  <p className="text-xs text-gray-500">{transaction.senderAccount}</p>
                  <p className="text-xs text-gray-400">฿150,000</p>
                </div>
              </div>
              <button className="px-4 py-2 bg-white border-2 border-blue-300 rounded-full text-xs font-semibold text-blue-600 hover:bg-blue-50 transition-all shadow-sm">
                Select ▾
              </button>
            </div>
            <div className="mt-3 text-xs text-gray-400 flex items-center gap-1">
              <span className="text-[10px]">🕐</span>
              <span>Updated at 8:23 PM</span>
            </div>
          </div>

          {/* Now / Schedule Toggle */}
          <div className="flex gap-3 mb-4">
            <button className="flex-1 bg-white text-blue-600 py-3 rounded-xl font-bold shadow-md border-2 border-blue-500 hover:bg-blue-50 transition-all">
              Now
            </button>
            <button className="flex-1 bg-white/50 text-gray-500 py-3 rounded-xl font-semibold border border-gray-200 hover:bg-white transition-all">
              Schedule
            </button>
          </div>

          {/* To: Favorite Section */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 mb-4 shadow-md border border-green-100">
            <p className="text-xs text-gray-500 mb-3">To: Favorite</p>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-[#138f3e] to-[#0f7032] rounded-full flex items-center justify-center shadow-md">
                <span className="text-white text-lg font-bold">K</span>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900 text-sm">{transaction.recipientName}</p>
                <p className="text-xs text-gray-600">{transaction.bank}</p>
                <p className="text-xs text-gray-500">{transaction.recipientAccount}</p>
              </div>
            </div>
          </div>

          {/* Amount Section - Prominent */}
          <div className="bg-white rounded-2xl p-6 mb-4 shadow-lg border-2 border-blue-200">
            <p className="text-xs text-gray-500 mb-3 text-center font-medium">Amount</p>
            <div className="flex items-baseline justify-center mb-1">
              <input
                type="text"
                value={transferAmount}
                onChange={(e) => setTransferAmount(e.target.value)}
                className="text-center text-5xl font-bold text-blue-600 border-none outline-none bg-transparent w-full"
                placeholder="0.00"
                style={{ caretColor: '#2563eb' }}
              />
            </div>
            <p className="text-center text-xl font-medium text-gray-500">Baht</p>
          </div>

          {/* Hong Yok Default Bird Message - Below Amount */}
          <div className="bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 rounded-2xl p-5 shadow-lg border-2 border-amber-200 mb-4">
            <div className="flex gap-4 items-center">
              {/* Bird Icon - Compact */}
              <div className="flex-shrink-0">
                <div className="animate-bounce-slow">
                  {defaultTransferBird.birdImagePath ? (
                    <img
                      src={defaultTransferBird.birdImagePath}
                      alt="Hong Yok"
                      className="w-24 h-24 object-contain drop-shadow-lg"
                    />
                  ) : (
                    <div className="w-24 h-24 bg-gradient-to-br from-yellow-200 to-orange-300 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                      <span className="text-3xl">🐦</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Message - Full Width */}
              <div className="flex-1 flex flex-col justify-center">
                <h3 className="font-bold text-base text-amber-900 mb-2 leading-snug">
                  {defaultTransferBird.title}
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {defaultTransferBird.message}
                </p>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    );
  }

  // Review Transaction Page (EXISTING)
  return (
    <div className="min-h-screen bg-gray-100 relative flex flex-col">
      {/* Debug Scenario Selector */}
      <div className="bg-[#3d4f5c] text-white p-2 flex gap-2 flex-wrap justify-between items-center px-3">
        <span className="text-[10px] font-semibold text-[#f5a623] uppercase tracking-wide">Dev Mode</span>
        <div className="flex gap-1.5 flex-wrap">
          {Object.values(MASCOT_STATES).map((state) => (
            <button
              key={state}
              onClick={() => {
                setSelectedScenario(state);
                resetApp();
              }}
              className={`px-2.5 py-1.5 rounded-md text-xs font-semibold transition-all ${
                selectedScenario === state
                  ? state === MASCOT_STATES.SAFE ? 'bg-white text-gray-900 shadow-md' :
                    state === MASCOT_STATES.CAUTION ? 'bg-[#c89a3f] text-white shadow-md' :
                    state === MASCOT_STATES.WARNING ? 'bg-[#e67e22] text-white shadow-md' :
                    state === MASCOT_STATES.PRESSURE ? 'bg-[#9b59b6] text-white shadow-md' :
                    'bg-[#c0392b] text-white shadow-md'
                  : 'bg-gray-600 hover:bg-gray-500 text-gray-200'
              }`}
            >
              {state === MASCOT_STATES.SAFE && 'Safe'}
              {state === MASCOT_STATES.CAUTION && 'Caution'}
              {state === MASCOT_STATES.WARNING && 'Warn'}
              {state === MASCOT_STATES.PRESSURE && 'Rush'}
              {state === MASCOT_STATES.BLOCKED && 'Critical'}
            </button>
          ))}
          <button
            onClick={resetApp}
            className="px-2.5 py-1.5 rounded-md text-xs font-semibold bg-gray-700 hover:bg-gray-600 text-white transition-all"
          >
            Reset
          </button>
        </div>
      </div>

      {/* K-Plus Review Screen */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${showIntervention ? 'blur-sm opacity-50' : ''}`}>
        {/* Header */}
        <div className="bg-gradient-to-b from-[#3d4f5c] to-[#2c3e4f] text-white px-4 py-3">
          <div className="flex items-center gap-3">
            <button onClick={resetApp} className="hover:bg-white/10 rounded-full p-1 transition">
              <ArrowLeft className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Content - Centered Card */}
        <div className="flex-1 flex items-center justify-center px-3 py-4 overflow-auto">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md min-h-[75vh] flex flex-col">
            {/* Transaction Flow */}
            <div className="px-5 py-6 flex-1">
              {/* Sender Section */}
              <div className="flex items-start gap-3 mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                  <User className="w-7 h-7 text-gray-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500 mb-1.5 font-medium">From</p>
                  <p className="font-bold text-gray-900 text-base leading-tight">{transaction.senderName}</p>
                  <p className="text-sm text-gray-500 mt-0.5">{transaction.senderAccount}</p>
                </div>
              </div>

              {/* Dotted Line with Arrow */}
              <div className="ml-7 border-l-2 border-dotted border-gray-300 h-10 relative">
                <div className="absolute left-[-6px] top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white flex items-center justify-center">
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </div>
              </div>

              {/* Recipient Section */}
              <div className="flex items-start gap-3 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-[#138f3e] to-[#0f7032] rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                  <span className="text-white text-xl font-bold">K</span>
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500 mb-1.5 font-medium">To</p>
                  <p className="font-bold text-[#00a9cc] text-base leading-tight">{transaction.recipientName}</p>
                  <p className="text-sm text-gray-500 mt-0.5">{transaction.recipientAccount}</p>
                </div>
              </div>

              {/* Amount Section */}
              <div className="border-t border-gray-200 pt-5 pb-5 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm font-medium">Amount</span>
                  <span className="text-3xl font-bold text-gray-900 tracking-tight">{transaction.amount} <span className="text-sm text-gray-500 font-normal">Baht</span></span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm font-medium">Fee</span>
                  <span className="text-xl font-bold text-green-600">0.00 <span className="text-sm text-gray-500 font-normal">Baht</span></span>
                </div>
              </div>

              {/* Note Section */}
              <div className="border-t border-gray-200 pt-4 pb-5">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm font-medium">Note</span>
                  <span className="text-sm text-gray-400 italic">Add note (optional)</span>
                </div>
              </div>

              {/* Hong Yok Bird Warning Section */}
              <div className="flex gap-4 items-start pt-2">
                {/* Bird Icon Placeholder - Changes color based on scenario */}
                <div className="flex-shrink-0">
                  {birdMessages[selectedScenario]?.birdImagePath || birdMessages.default.birdImagePath ? (
                    <img
                      src={birdMessages[selectedScenario]?.birdImagePath || birdMessages.default.birdImagePath}
                      alt="Hong Yok"
                      className="w-20 h-20 object-contain drop-shadow-lg"
                    />
                  ) : (
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center border-2 ${
                      selectedScenario === MASCOT_STATES.SAFE ? 'bg-green-100 border-green-500' :
                      selectedScenario === MASCOT_STATES.CAUTION ? 'bg-yellow-100 border-yellow-500' :
                      selectedScenario === MASCOT_STATES.WARNING ? 'bg-orange-100 border-orange-500' :
                      selectedScenario === MASCOT_STATES.PRESSURE ? 'bg-purple-100 border-purple-500' :
                      selectedScenario === MASCOT_STATES.BLOCKED ? 'bg-red-100 border-red-500' :
                      'bg-blue-100 border-blue-400'
                    }`}>
                      <div className="text-center">
                        <span className={`text-xs font-bold ${
                          selectedScenario === MASCOT_STATES.SAFE ? 'text-green-600' :
                          selectedScenario === MASCOT_STATES.CAUTION ? 'text-yellow-600' :
                          selectedScenario === MASCOT_STATES.WARNING ? 'text-orange-600' :
                          selectedScenario === MASCOT_STATES.PRESSURE ? 'text-purple-600' :
                          selectedScenario === MASCOT_STATES.BLOCKED ? 'text-red-600' :
                          'text-blue-600'
                        }`}>
                          [BIRD]
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Speech Bubble - Changes color and text based on scenario */}
                <div className="flex-1 relative">
                  {/* Speech bubble tail - color changes with scenario */}
                  <div className={`absolute left-[-10px] top-5 w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-r-[12px] ${
                    selectedScenario === MASCOT_STATES.SAFE ? 'border-r-green-200' :
                    selectedScenario === MASCOT_STATES.CAUTION ? 'border-r-yellow-200' :
                    selectedScenario === MASCOT_STATES.WARNING ? 'border-r-orange-200' :
                    selectedScenario === MASCOT_STATES.PRESSURE ? 'border-r-purple-200' :
                    selectedScenario === MASCOT_STATES.BLOCKED ? 'border-r-red-200' :
                    'border-r-yellow-200'
                  }`}></div>

                  {/* Speech bubble content - color and text change with scenario */}
                  <div className={`rounded-2xl p-4 shadow-lg border-2 ${
                    selectedScenario === MASCOT_STATES.SAFE ? 'bg-gradient-to-br from-green-50 to-green-100 border-green-200' :
                    selectedScenario === MASCOT_STATES.CAUTION ? 'bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200' :
                    selectedScenario === MASCOT_STATES.WARNING ? 'bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200' :
                    selectedScenario === MASCOT_STATES.PRESSURE ? 'bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200' :
                    selectedScenario === MASCOT_STATES.BLOCKED ? 'bg-gradient-to-br from-red-50 to-red-100 border-red-200' :
                    'bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200'
                  }`}>
                    <p className={`font-bold text-base mb-2 ${
                      selectedScenario === MASCOT_STATES.SAFE ? 'text-green-900' :
                      selectedScenario === MASCOT_STATES.CAUTION ? 'text-yellow-900' :
                      selectedScenario === MASCOT_STATES.WARNING ? 'text-orange-900' :
                      selectedScenario === MASCOT_STATES.PRESSURE ? 'text-purple-900' :
                      selectedScenario === MASCOT_STATES.BLOCKED ? 'text-red-900' :
                      'text-yellow-900'
                    }`}>
                      {birdMessages[selectedScenario]?.title || birdMessages.default.title}
                    </p>
                    <p className={`text-sm leading-relaxed ${
                      selectedScenario === MASCOT_STATES.SAFE ? 'text-green-800' :
                      selectedScenario === MASCOT_STATES.CAUTION ? 'text-yellow-800' :
                      selectedScenario === MASCOT_STATES.WARNING ? 'text-orange-800' :
                      selectedScenario === MASCOT_STATES.PRESSURE ? 'text-purple-800' :
                      selectedScenario === MASCOT_STATES.BLOCKED ? 'text-red-800' :
                      'text-yellow-800'
                    }`}>
                      {birdMessages[selectedScenario]?.message || birdMessages.default.message}
                    </p>
                  </div>
                </div>
              </div>

              {/* CAUTION Scenario - Verification Checklist */}
              {selectedScenario === MASCOT_STATES.CAUTION && (
                <div className="mt-5 bg-gradient-to-br from-yellow-50 to-amber-50 border-2 border-yellow-300 rounded-2xl p-5 shadow-lg">
                  <p className="text-base font-bold text-yellow-900 mb-3">
                    กรุณาตรวจสอบ:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-yellow-600 mt-1 text-lg">✓</span>
                      <span className="text-sm text-gray-700 leading-relaxed">ชื่อผู้รับตรงกับคนที่คุณต้องการโอนเงินให้</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-yellow-600 mt-1 text-lg">✓</span>
                      <span className="text-sm text-gray-700 leading-relaxed">เลขบัญชีถูกต้อง</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-yellow-600 mt-1 text-lg">✓</span>
                      <span className="text-sm text-gray-700 leading-relaxed">จำนวนเงินตรงตามที่ตกลงกัน</span>
                    </li>
                  </ul>
                </div>
              )}

              {/* WARNING Scenario - Risk Factors */}
              {selectedScenario === MASCOT_STATES.WARNING && (
                <div className="mt-5 bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-300 rounded-2xl p-5 shadow-lg">
                  <p className="text-base font-bold text-red-900 mb-3">
                    ⚠️ ปัจจัยเสี่ยง:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-red-600 mt-1 text-lg">•</span>
                      <span className="text-sm text-gray-800 leading-relaxed font-medium">IP ผู้รับอยู่ในประเทศกัมพูชา</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-600 mt-1 text-lg">•</span>
                      <span className="text-sm text-gray-800 leading-relaxed font-medium">โอนเงินครั้งแรก</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-600 mt-1 text-lg">•</span>
                      <span className="text-sm text-gray-800 leading-relaxed font-medium">จำนวนเงินสูง</span>
                    </li>
                  </ul>
                </div>
              )}

              {/* BLOCKED Scenario - Warning Signs */}
              {selectedScenario === MASCOT_STATES.BLOCKED && (
                <div className="mt-5 bg-white border-2 border-red-400 rounded-2xl p-5 shadow-lg">
                  <p className="text-base font-bold text-red-900 mb-3">
                    🚨 สัญญาณเตือน:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-red-600 mt-1 text-lg">•</span>
                      <span className="text-sm text-gray-800 leading-relaxed font-medium">บัญชีปลายทางถูกรายงานว่าเกี่ยวข้องกับการฉ้อโกง</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-600 mt-1 text-lg">•</span>
                      <span className="text-sm text-gray-800 leading-relaxed font-medium">มีรูปแบบการโอนเงินที่ผิดปกติ</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-600 mt-1 text-lg">•</span>
                      <span className="text-sm text-gray-800 leading-relaxed font-medium">ระบบตรวจพบความเสี่ยงระดับสูงสุด</span>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className={`bg-white border-t-2 border-gray-200 px-4 py-4 transition-all duration-300 shadow-lg ${showIntervention ? 'blur-sm opacity-50' : ''}`}>
        <div className="max-w-md mx-auto">
          {selectedScenario === MASCOT_STATES.WARNING ? (
            // WARNING Scenario - Slide to Confirm with Intervention Design
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs text-gray-500 font-medium">Total Amount</span>
                <span className="text-2xl font-bold text-red-700 tracking-tight">{transaction.amount}</span>
              </div>

              {/* Intervention Message */}
              <div className="bg-gradient-to-br from-orange-100 to-red-50 border-2 border-orange-400 rounded-2xl p-4 shadow-md">
                <p className="text-sm font-bold text-orange-900 text-center mb-2">
                  ⚠️ คุณแน่ใจหรือไม่?
                </p>
                <p className="text-xs text-orange-800 text-center leading-relaxed">
                  การโอนนี้มีความเสี่ยงสูง กรุณาคิดอีกครั้งก่อนดำเนินการ
                </p>
              </div>

              {/* Slider with psychological friction */}
              <div className="relative w-full h-16 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full overflow-hidden shadow-inner border-2 border-gray-400">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderValue}
                  onChange={handleSliderChange}
                  className="slider-warning absolute w-full h-full opacity-0 cursor-pointer z-10"
                  disabled={showIntervention}
                />
                <div
                  className="absolute left-0 top-0 h-full bg-gradient-to-r from-orange-500 via-orange-600 to-red-600 transition-all duration-300 rounded-full"
                  style={{ width: `${sliderValue}%` }}
                ></div>
                <div
                  className="absolute left-0 top-0 h-16 w-16 bg-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 border-4 border-orange-600"
                  style={{ left: `calc(${sliderValue}% - 32px)`, maxLeft: 'calc(100% - 64px)' }}
                >
                  <div className="text-center">
                    <ChevronDown className="w-8 h-8 text-orange-600 transform rotate-[-90deg]" strokeWidth={3} />
                  </div>
                </div>
                <span className="absolute inset-0 flex items-center justify-center text-base font-bold text-white drop-shadow-lg pointer-events-none px-20">
                  {sliderValue < 95 ? '→ เลื่อนเพื่อยืนยัน →' : 'กำลังดำเนินการ...'}
                </span>
              </div>

              {/* Cancel button - more prominent */}
              <button
                onClick={resetApp}
                className="w-full bg-gradient-to-r from-gray-600 to-gray-700 text-white py-4 rounded-full font-bold hover:from-gray-700 hover:to-gray-800 transition shadow-lg"
              >
                ยกเลิกการโอนเงิน
              </button>

              {/* Additional warning text */}
              <p className="text-xs text-center text-gray-600 italic">
                หากไม่มั่นใจ ควรหยุดและตรวจสอบอีกครั้ง
              </p>
            </div>
          ) : (
            // Default Action Bar for other scenarios
            <div className="flex justify-between items-center">
              <div className="flex flex-col items-center gap-1.5">
                <button
                  onClick={resetApp}
                  className="w-14 h-14 bg-white border-2 border-orange-500 rounded-full flex items-center justify-center shadow-lg hover:bg-orange-50 hover:scale-105 transition-all active:scale-95"
                  disabled={showIntervention}
                >
                  <X className="w-7 h-7 text-orange-500" strokeWidth={2.5} />
                </button>
                <span className="text-xs font-semibold text-gray-600">Cancel</span>
              </div>

              <div className="flex-1 flex flex-col items-center px-6">
                <span className="text-xs text-gray-500 mb-1 font-medium">Total Amount</span>
                <span className="text-2xl font-bold text-gray-900 tracking-tight">{transaction.amount}</span>
              </div>

              <div className="flex flex-col items-center gap-1.5">
                <button
                  onClick={handleConfirmClick}
                  className="w-14 h-14 bg-gradient-to-br from-[#4db8c4] to-[#3da8b4] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 transition-all active:scale-95"
                  disabled={showIntervention}
                >
                  <Check className="w-7 h-7 text-white" strokeWidth={3} />
                </button>
                <span className="text-xs font-semibold text-gray-600">Confirm</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* AI Security Agent Intervention Overlay */}
      {showIntervention && (
        <div className="fixed inset-0 flex items-center justify-center p-6 z-50 pointer-events-none">
          <div className="pointer-events-auto bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 border-4 ${currentConfig.borderColor}">
            {/* Mascot Placeholder - Hide for BLOCKED and PRESSURE scenarios */}
            {selectedScenario !== MASCOT_STATES.BLOCKED && selectedScenario !== MASCOT_STATES.PRESSURE && (
              <div className={`w-32 h-32 mx-auto mb-4 ${currentConfig.color} rounded-full flex items-center justify-center border-4 ${currentConfig.borderColor} relative`}>
                {currentConfig.icon && (
                  <currentConfig.icon className={`w-16 h-16 ${currentConfig.iconColor} absolute`} strokeWidth={2} />
                )}
                <div className="text-center">
                  <div className={`text-xs font-bold ${currentConfig.iconColor} mt-16`}>
                    [IMG: {currentConfig.placeholder}]
                  </div>
                </div>
              </div>
            )}

            {/* Message - Hide for BLOCKED and PRESSURE scenarios */}
            {selectedScenario !== MASCOT_STATES.BLOCKED && selectedScenario !== MASCOT_STATES.PRESSURE && (
              <>
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
                  {currentConfig.message}
                </h2>
                <p className="text-center text-gray-600 mb-6">
                  {currentConfig.subtitle}
                </p>
              </>
            )}

            {/* State-Specific Actions */}
            {selectedScenario === MASCOT_STATES.SAFE && (
              <div className="space-y-4">
                {/* Bird Message for SAFE */}
                <div className="flex gap-3 items-start">
                  <div className="flex-shrink-0">
                    {birdMessages[MASCOT_STATES.SAFE].birdImagePath ? (
                      <img
                        src={birdMessages[MASCOT_STATES.SAFE].birdImagePath}
                        alt="Hong Yok Safe"
                        className="w-24 h-24 object-contain"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center border-2 border-green-500">
                        <span className="text-xs font-bold text-green-600">[GREEN]</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 relative">
                    <div className="absolute left-[-8px] top-4 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-green-300"></div>
                    <div className="bg-green-50 border-2 border-green-300 rounded-2xl p-4 shadow-sm">
                      <p className="font-semibold text-green-900 text-sm mb-1">{birdMessages[MASCOT_STATES.SAFE].title}</p>
                      <p className="text-xs text-green-800 leading-relaxed">{birdMessages[MASCOT_STATES.SAFE].message}</p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                </div>
              </div>
            )}

            {selectedScenario === MASCOT_STATES.CAUTION && !userConfirmedCaution && (
              <div className="space-y-4">
                {/* Bird Message for CAUTION */}
                <div className="flex gap-3 items-start">
                  <div className="flex-shrink-0">
                    {birdMessages[MASCOT_STATES.CAUTION].birdImagePath ? (
                      <img
                        src={birdMessages[MASCOT_STATES.CAUTION].birdImagePath}
                        alt="Hong Yok Caution"
                        className="w-24 h-24 object-contain"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center border-2 border-yellow-500">
                        <span className="text-xs font-bold text-yellow-600">[YELLOW]</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 relative">
                    <div className="absolute left-[-8px] top-4 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-yellow-300"></div>
                    <div className="bg-yellow-50 border-2 border-yellow-300 rounded-2xl p-4 shadow-sm">
                      <p className="font-semibold text-yellow-900 text-sm mb-1">{birdMessages[MASCOT_STATES.CAUTION].title}</p>
                      <p className="text-xs text-yellow-800 leading-relaxed">{birdMessages[MASCOT_STATES.CAUTION].message}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    <span className="font-semibold">Please verify:</span>
                  </p>
                  <ul className="mt-2 space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-600 mt-0.5">•</span>
                      <span>Recipient name matches who you intend to pay</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-600 mt-0.5">•</span>
                      <span>Account number is correct</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-600 mt-0.5">•</span>
                      <span>Transfer amount is as agreed</span>
                    </li>
                  </ul>
                </div>
                <button
                  onClick={handleCautionConfirm}
                  className="w-full bg-[#4db8c4] text-white py-4 rounded-full font-semibold hover:bg-[#3da8b4] transition shadow-md"
                >
                  I checked, Proceed
                </button>
                <button
                  onClick={resetApp}
                  className="w-full bg-white text-gray-700 py-3 rounded-full font-medium border-2 border-gray-300 hover:bg-gray-50 transition"
                >
                  Cancel Transfer
                </button>
              </div>
            )}

            {selectedScenario === MASCOT_STATES.CAUTION && userConfirmedCaution && (
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-600"></div>
              </div>
            )}

            {selectedScenario === MASCOT_STATES.WARNING && (
              <div className="space-y-4">
                {/* Bird Message for WARNING */}
                <div className="flex gap-3 items-start">
                  <div className="flex-shrink-0">
                    {birdMessages[MASCOT_STATES.WARNING].birdImagePath ? (
                      <img
                        src={birdMessages[MASCOT_STATES.WARNING].birdImagePath}
                        alt="Hong Yok Warning"
                        className="w-24 h-24 object-contain"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center border-2 border-orange-500">
                        <span className="text-xs font-bold text-orange-600">[ORANGE]</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 relative">
                    <div className="absolute left-[-8px] top-4 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-orange-300"></div>
                    <div className="bg-orange-50 border-2 border-orange-300 rounded-2xl p-4 shadow-sm">
                      <p className="font-semibold text-orange-900 text-sm mb-1">{birdMessages[MASCOT_STATES.WARNING].title}</p>
                      <p className="text-xs text-orange-800 leading-relaxed">{birdMessages[MASCOT_STATES.WARNING].message}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-sm font-semibold text-red-800 mb-2">Risk Factors:</p>
                  <ul className="text-xs text-red-700 list-disc list-inside space-y-1">
                    <li>Recipient IP: Cambodia</li>
                    <li>First-time transfer</li>
                    <li>High amount</li>
                  </ul>
                </div>
                <div className="relative">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={sliderValue}
                    onChange={handleSliderChange}
                    className="w-full h-12 appearance-none bg-gradient-to-r from-gray-300 to-red-500 rounded-full outline-none slider"
                    style={{
                      background: `linear-gradient(to right, #ef4444 0%, #ef4444 ${sliderValue}%, #d1d5db ${sliderValue}%, #d1d5db 100%)`
                    }}
                  />
                  <div className="absolute top-0 left-0 right-0 flex items-center justify-center h-12 pointer-events-none">
                    <span className="text-white font-bold text-sm drop-shadow">
                      {sliderValue < 95 ? '→ Slide to Accept Risk →' : 'Proceeding...'}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {selectedScenario === MASCOT_STATES.PRESSURE && (
              <div className="space-y-5">
                {/* Question with options */}
                <div className="space-y-3">
                  <p className="text-sm font-bold text-center text-gray-800">
                    มีใครเร่งรัดให้คุณโอนเงินหรือไม่?
                  </p>
                  <button
                    onClick={() => handlePressureResponse(true)}
                    className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-4 rounded-full font-bold hover:from-red-600 hover:to-red-700 transition shadow-lg"
                  >
                    มี - มีคนเร่งรัดให้โอนเลย
                  </button>
                  <button
                    onClick={() => handlePressureResponse(false)}
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-full font-bold hover:from-green-600 hover:to-green-700 transition shadow-lg"
                  >
                    ไม่มี - ฉันตัดสินใจเองอย่างรอบคอบ
                  </button>
                </div>
              </div>
            )}

            {selectedScenario === MASCOT_STATES.BLOCKED && (
              <div className="space-y-5">
                {/* Lock Icon */}
                <div className="flex justify-center">
                  <div className="w-28 h-28 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center border-4 border-red-500 shadow-lg">
                    <Lock className="w-14 h-14 text-red-600" strokeWidth={2.5} />
                  </div>
                </div>

                {/* Warning Box */}
                <div className="bg-red-100 border-2 border-red-500 rounded-xl p-5">
                  <p className="text-base font-bold text-red-800 text-center mb-1">
                    ⚠️ ธุรกรรมนี้มีความเสี่ยงสูงมาก
                  </p>
                </div>

                {/* Risk Factors */}
                <div className="bg-white border-2 border-red-300 rounded-xl p-5">
                  <p className="text-sm font-bold text-red-900 mb-3">
                    สัญญาณเตือน:
                  </p>
                  <ul className="space-y-2.5">
                    <li className="flex items-start gap-2.5">
                      <span className="text-red-600 mt-0.5 text-base">•</span>
                      <span className="text-sm text-gray-800 leading-relaxed">บัญชีปลายทางถูกรายงานว่าเกี่ยวข้องกับการฉ้อโกง</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-red-600 mt-0.5 text-base">•</span>
                      <span className="text-sm text-gray-800 leading-relaxed">มีรูปแบบการโอนเงินที่ผิดปกติ</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-red-600 mt-0.5 text-base">•</span>
                      <span className="text-sm text-gray-800 leading-relaxed">ระบบตรวจพบความเสี่ยงระดับสูงสุด</span>
                    </li>
                  </ul>
                </div>

                {/* Two action choices */}
                <div className="space-y-3">
                  <button
                    onClick={() => {
                      // Contact bank action - recommended safe option
                      alert('กำลังเชื่อมต่อไปยังศูนย์บริการลูกค้า K-Plus\n\nโทร: 02-8888888\nหรือ แชท: K-LIVE');
                      resetApp();
                    }}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-full font-bold hover:from-blue-700 hover:to-blue-800 transition shadow-lg"
                  >
                    ติดต่อธนาคาร
                  </button>

                  {/* Slider to proceed despite warning - high friction */}
                  <div className="relative w-full h-16 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full overflow-hidden shadow-inner border-2 border-gray-400">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={sliderValue}
                      onChange={handleSliderChange}
                      className="slider-blocked absolute w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div
                      className="absolute left-0 top-0 h-full bg-gradient-to-r from-red-500 via-red-600 to-red-700 transition-all duration-300 rounded-full"
                      style={{ width: `${sliderValue}%` }}
                    ></div>
                    <div
                      className="absolute left-0 top-0 h-16 w-16 bg-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 border-4 border-red-600"
                      style={{ left: `calc(${sliderValue}% - 32px)`, maxLeft: 'calc(100% - 64px)' }}
                    >
                      <div className="text-center">
                        <ChevronDown className="w-8 h-8 text-red-600 transform rotate-[-90deg]" strokeWidth={3} />
                      </div>
                    </div>
                    <span className="absolute inset-0 flex items-center justify-center text-base font-bold text-white drop-shadow-lg pointer-events-none px-20">
                      {sliderValue < 95 ? '→ เลื่อนเพื่อโอน →' : 'กำลังดำเนินการ...'}
                    </span>
                  </div>

                  <p className="text-xs text-center text-gray-600 italic mt-2">
                    แนะนำให้ติดต่อธนาคารเพื่อความปลอดภัย
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 48px;
          height: 48px;
          background: white;
          border: 3px solid #ef4444;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        }
        .slider::-moz-range-thumb {
          width: 48px;
          height: 48px;
          background: white;
          border: 3px solid #ef4444;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        }
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export default App;
