'use client'
import { useState } from 'react'
import { TIME_SLOTS } from '@/lib/mockData'

interface CartItem {
  productId: string
  name: string
  price: number
  qty: number
  variant?: string
  image: string
  stallName: string
  customization?: string
}

interface Props {
  cart: CartItem[]
  stallName: string
  stallCategory: string
  onClose: () => void
  onSuccess: () => void
}

type OrderType = 'immediate' | 'preorder'
type Step = 'details' | 'schedule' | 'confirm'

const CUSTOMIZATION_OPTIONS: Record<string, string[]> = {
  candles: [
    'Add gift wrapping',
    'Add personalized note',
    'Custom scent blend',
    'Custom label/name',
  ],
  pottery: [
    'Custom color glaze',
    'Engraved message',
    'Gift packaging',
    'Custom size request',
  ],
  jewellery: [
    'Custom engraving',
    'Gift box',
    'Resize to measurement',
    'Custom chain length',
  ],
  'street-food': [
    'Extra spicy',
    'Less oil',
    'No onion/garlic',
    'Extra chutney',
    'Allergen note',
  ],
  art: [
    'Custom frame',
    'Specific dimensions',
    'Dedication note',
    'Digital copy included',
  ],
  plants: [
    'Decorative pot',
    'Care instructions card',
    'Gift wrapping',
    'Repotting service',
  ],
  handmade: [
    'Custom color',
    'Personalized message',
    'Gift packaging',
    'Bulk discount request',
  ],
  clothing: [
    'Custom size',
    'Blouse stitching',
    'Embroidery add-on',
    'Express delivery',
  ],
  default: ['Gift wrapping', 'Personalized note', 'Special instructions'],
}

export default function Checkout({
  cart,
  stallName,
  stallCategory,
  onClose,
  onSuccess,
}: Props) {
  const [step, setStep] = useState<Step>('details')
  const [orderType, setOrderType] = useState<OrderType>('immediate')
  const [selectedSlot, setSelectedSlot] = useState(TIME_SLOTS[0])
  const [selectedDate, setSelectedDate] = useState<'today' | 'tomorrow'>(
    'today',
  )
  const [selectedCustomizations, setSelectedCustomizations] = useState<
    string[]
  >([])
  const [specialNote, setSpecialNote] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [name, setName] = useState('')
  const [placing, setPlacing] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const customOptions =
    CUSTOMIZATION_OPTIONS[stallCategory] || CUSTOMIZATION_OPTIONS.default
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0)
  const deliveryFee = orderType === 'immediate' ? 30 : 0
  const total = subtotal + deliveryFee

  const toggleCustomization = (opt: string) => {
    setSelectedCustomizations((prev) =>
      prev.includes(opt) ? prev.filter((o) => o !== opt) : [...prev, opt],
    )
  }

  const validate = () => {
    const e: Record<string, string> = {}
    if (!name.trim()) e.name = 'Name is required'
    if (!phone.trim() || !/^\d{10}$/.test(phone.trim()))
      e.phone = 'Enter a valid 10-digit number'
    if (!address.trim()) e.address = 'Delivery address is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleNext = () => {
    if (step === 'details') {
      if (!validate()) return
      setStep('schedule')
    } else if (step === 'schedule') {
      setStep('confirm')
    }
  }

  const handlePlace = async () => {
    setPlacing(true)
    await new Promise((r) => setTimeout(r, 1600))
    setPlacing(false)
    onSuccess()
  }

  const getTodayDate = () => {
    const d = new Date()
    return d.toLocaleDateString('en-IN', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    })
  }
  const getTomorrowDate = () => {
    const d = new Date()
    d.setDate(d.getDate() + 1)
    return d.toLocaleDateString('en-IN', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    })
  }

  return (
    <div
      style={styles.overlay}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div style={styles.sheet}>
        {/* Header */}
        <div style={styles.header}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {step !== 'details' && (
              <button
                onClick={() =>
                  setStep(step === 'confirm' ? 'schedule' : 'details')
                }
                style={styles.backBtn}
              >
                ←
              </button>
            )}
            <div>
              <h2 style={styles.headerTitle}>
                {step === 'details' && 'Your Details'}
                {step === 'schedule' && 'Schedule & Customise'}
                {step === 'confirm' && 'Confirm Order'}
              </h2>
              <p style={styles.headerSub}>{stallName}</p>
            </div>
          </div>
          <button onClick={onClose} style={styles.closeBtn}>
            ✕
          </button>
        </div>

        {/* Progress */}
        <div style={styles.progress}>
          {(['details', 'schedule', 'confirm'] as Step[]).map((s, i) => (
            <div
              key={s}
              style={{
                display: 'flex',
                alignItems: 'center',
                flex: i < 2 ? 1 : 0,
              }}
            >
              <div
                style={{
                  ...styles.progressDot,
                  background:
                    step === s
                      ? '#FF6B2B'
                      : (step === 'schedule' && s === 'details') ||
                          step === 'confirm'
                        ? '#FF6B2B'
                        : '#F0E6D9',
                  color:
                    step === s ||
                    (step === 'schedule' && s === 'details') ||
                    step === 'confirm'
                      ? '#fff'
                      : '#C4A882',
                }}
              >
                {(step === 'schedule' && s === 'details') ||
                (step === 'confirm' && s !== 'confirm')
                  ? '✓'
                  : i + 1}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: step === s ? '#FF6B2B' : '#8B7355',
                  fontWeight: step === s ? 700 : 400,
                  marginLeft: 6,
                  whiteSpace: 'nowrap',
                }}
              >
                {s === 'details'
                  ? 'Details'
                  : s === 'schedule'
                    ? 'Schedule'
                    : 'Confirm'}
              </div>
              {i < 2 && (
                <div
                  style={{
                    flex: 1,
                    height: 2,
                    background: '#F0E6D9',
                    margin: '0 10px',
                  }}
                />
              )}
            </div>
          ))}
        </div>

        <div style={styles.body}>
          {/* STEP 1: Details */}
          {step === 'details' && (
            <div>
              <div style={styles.cartSummary}>
                <div style={styles.sectionLabel}>🛒 Order Summary</div>
                {cart.map((item, i) => (
                  <div key={i} style={styles.cartRow}>
                    <img
                      src={item.image}
                      alt={item.name}
                      style={styles.cartImg}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={styles.cartItemName}>{item.name}</div>
                      {item.variant && (
                        <div style={styles.cartItemMeta}>
                          Variant: {item.variant}
                        </div>
                      )}
                      <div style={styles.cartItemMeta}>Qty: {item.qty}</div>
                    </div>
                    <div style={styles.cartItemPrice}>
                      ₹{item.price * item.qty}
                    </div>
                  </div>
                ))}
                <div style={styles.cartTotal}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: 4,
                    }}
                  >
                    <span style={{ fontSize: 13, color: '#8B7355' }}>
                      Subtotal
                    </span>
                    <span
                      style={{
                        fontSize: 13,
                        color: '#1A1208',
                        fontWeight: 600,
                      }}
                    >
                      ₹{subtotal}
                    </span>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: 4,
                    }}
                  >
                    <span style={{ fontSize: 13, color: '#8B7355' }}>
                      Delivery
                    </span>
                    <span
                      style={{
                        fontSize: 13,
                        color:
                          orderType === 'immediate' ? '#1A1208' : '#16a34a',
                        fontWeight: 600,
                      }}
                    >
                      {orderType === 'immediate' ? '₹30' : 'FREE'}
                    </span>
                  </div>
                </div>
              </div>

              <div style={styles.sectionLabel}>👤 Contact Info</div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Full Name</label>
                <input
                  style={{
                    ...styles.input,
                    borderColor: errors.name ? '#dc2626' : '#F0E6D9',
                  }}
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value)
                    setErrors((er) => ({ ...er, name: '' }))
                  }}
                />
                {errors.name && (
                  <span style={styles.errMsg}>{errors.name}</span>
                )}
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Phone Number</label>
                <div style={{ display: 'flex', gap: 8 }}>
                  <div
                    style={{
                      ...styles.input,
                      width: 56,
                      flexShrink: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#8B7355',
                      fontSize: 14,
                    }}
                  >
                    +91
                  </div>
                  <input
                    style={{
                      ...styles.input,
                      flex: 1,
                      borderColor: errors.phone ? '#dc2626' : '#F0E6D9',
                    }}
                    placeholder="10-digit mobile number"
                    type="tel"
                    maxLength={10}
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value.replace(/\D/, ''))
                      setErrors((er) => ({ ...er, phone: '' }))
                    }}
                  />
                </div>
                {errors.phone && (
                  <span style={styles.errMsg}>{errors.phone}</span>
                )}
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Delivery Address</label>
                <textarea
                  style={
                    {
                      ...styles.input,
                      minHeight: 72,
                      resize: 'vertical',
                      borderColor: errors.address ? '#dc2626' : '#F0E6D9',
                    } as any
                  }
                  placeholder="House/flat no., street, area, landmark..."
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value)
                    setErrors((er) => ({ ...er, address: '' }))
                  }}
                />
                {errors.address && (
                  <span style={styles.errMsg}>{errors.address}</span>
                )}
              </div>
            </div>
          )}

          {/* STEP 2: Schedule + Customise */}
          {step === 'schedule' && (
            <div>
              <div style={styles.sectionLabel}>⚡ Order Type</div>
              <div style={styles.orderTypeGrid}>
                <div
                  onClick={() => setOrderType('immediate')}
                  style={{
                    ...styles.orderTypeCard,
                    border: `2px solid ${orderType === 'immediate' ? '#FF6B2B' : '#F0E6D9'}`,
                    background: orderType === 'immediate' ? '#FFF0E6' : '#fff',
                  }}
                >
                  <div style={{ fontSize: 28, marginBottom: 6 }}>⚡</div>
                  <div style={styles.orderTypeTitle}>Immediate</div>
                  <div style={styles.orderTypeSub}>
                    Get it as soon as possible
                  </div>
                  <div
                    style={{
                      marginTop: 8,
                      fontSize: 12,
                      fontWeight: 700,
                      color: '#FF6B2B',
                    }}
                  >
                    + ₹30 delivery
                  </div>
                </div>
                <div
                  onClick={() => setOrderType('preorder')}
                  style={{
                    ...styles.orderTypeCard,
                    border: `2px solid ${orderType === 'preorder' ? '#FF6B2B' : '#F0E6D9'}`,
                    background: orderType === 'preorder' ? '#FFF0E6' : '#fff',
                  }}
                >
                  <div style={{ fontSize: 28, marginBottom: 6 }}>📅</div>
                  <div style={styles.orderTypeTitle}>Pre-Order</div>
                  <div style={styles.orderTypeSub}>Pick a date & time slot</div>
                  <div
                    style={{
                      marginTop: 8,
                      fontSize: 12,
                      fontWeight: 700,
                      color: '#16a34a',
                    }}
                  >
                    FREE delivery
                  </div>
                </div>
              </div>

              {orderType === 'preorder' && (
                <div style={{ marginTop: 20 }}>
                  <div style={styles.sectionLabel}>📆 Select Date</div>
                  <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
                    {(['today', 'tomorrow'] as const).map((d) => (
                      <div
                        key={d}
                        onClick={() => setSelectedDate(d)}
                        style={{
                          flex: 1,
                          padding: '12px 16px',
                          borderRadius: 12,
                          cursor: 'pointer',
                          textAlign: 'center',
                          border: `2px solid ${selectedDate === d ? '#FF6B2B' : '#F0E6D9'}`,
                          background: selectedDate === d ? '#FFF0E6' : '#fff',
                        }}
                      >
                        <div
                          style={{
                            fontSize: 13,
                            fontWeight: 700,
                            color: selectedDate === d ? '#FF6B2B' : '#1A1208',
                            textTransform: 'capitalize',
                          }}
                        >
                          {d}
                        </div>
                        <div
                          style={{
                            fontSize: 11,
                            color: '#8B7355',
                            marginTop: 2,
                          }}
                        >
                          {d === 'today' ? getTodayDate() : getTomorrowDate()}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div style={styles.sectionLabel}>🕐 Select Time Slot</div>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 8,
                      marginBottom: 4,
                    }}
                  >
                    {TIME_SLOTS.map((slot) => (
                      <div
                        key={slot}
                        onClick={() => setSelectedSlot(slot)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '12px 16px',
                          borderRadius: 12,
                          cursor: 'pointer',
                          border: `2px solid ${selectedSlot === slot ? '#FF6B2B' : '#F0E6D9'}`,
                          background:
                            selectedSlot === slot ? '#FFF0E6' : '#fff',
                          transition: 'all 0.15s',
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 10,
                          }}
                        >
                          <div
                            style={{
                              width: 18,
                              height: 18,
                              borderRadius: '50%',
                              border: `2px solid ${selectedSlot === slot ? '#FF6B2B' : '#C4A882'}`,
                              background:
                                selectedSlot === slot
                                  ? '#FF6B2B'
                                  : 'transparent',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0,
                            }}
                          >
                            {selectedSlot === slot && (
                              <div
                                style={{
                                  width: 7,
                                  height: 7,
                                  borderRadius: '50%',
                                  background: '#fff',
                                }}
                              />
                            )}
                          </div>
                          <span
                            style={{
                              fontSize: 14,
                              fontWeight: selectedSlot === slot ? 700 : 500,
                              color:
                                selectedSlot === slot ? '#FF6B2B' : '#1A1208',
                            }}
                          >
                            {slot}
                          </span>
                        </div>
                        <span
                          style={{
                            fontSize: 11,
                            color: '#16a34a',
                            fontWeight: 600,
                            background: '#dcfce7',
                            padding: '2px 8px',
                            borderRadius: 10,
                          }}
                        >
                          Available
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Customizations */}
              <div style={{ marginTop: 24 }}>
                <div style={styles.sectionLabel}>✨ Customise Your Order</div>
                <p style={{ fontSize: 12, color: '#8B7355', marginBottom: 12 }}>
                  Select any add-ons or special requests for this stall
                </p>
                <div
                  style={{ display: 'flex', flexDirection: 'column', gap: 8 }}
                >
                  {customOptions.map((opt) => (
                    <div
                      key={opt}
                      onClick={() => toggleCustomization(opt)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                        padding: '11px 14px',
                        borderRadius: 12,
                        cursor: 'pointer',
                        border: `2px solid ${selectedCustomizations.includes(opt) ? '#FF6B2B' : '#F0E6D9'}`,
                        background: selectedCustomizations.includes(opt)
                          ? '#FFF0E6'
                          : '#fff',
                        transition: 'all 0.15s',
                      }}
                    >
                      <div
                        style={{
                          width: 20,
                          height: 20,
                          borderRadius: 6,
                          border: `2px solid ${selectedCustomizations.includes(opt) ? '#FF6B2B' : '#C4A882'}`,
                          background: selectedCustomizations.includes(opt)
                            ? '#FF6B2B'
                            : 'transparent',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        {selectedCustomizations.includes(opt) && (
                          <span
                            style={{
                              color: '#fff',
                              fontSize: 12,
                              fontWeight: 800,
                            }}
                          >
                            ✓
                          </span>
                        )}
                      </div>
                      <span
                        style={{
                          fontSize: 13,
                          fontWeight: 500,
                          color: selectedCustomizations.includes(opt)
                            ? '#FF6B2B'
                            : '#1A1208',
                        }}
                      >
                        {opt}
                      </span>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: 16 }}>
                  <label style={styles.label}>
                    Special Instructions (optional)
                  </label>
                  <textarea
                    style={
                      {
                        ...styles.input,
                        minHeight: 80,
                        resize: 'vertical',
                      } as any
                    }
                    placeholder="Any specific request for the vendor..."
                    value={specialNote}
                    onChange={(e) => setSpecialNote(e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Confirm */}
          {step === 'confirm' && (
            <div>
              {/* Order Items */}
              <div style={styles.confirmSection}>
                <div style={styles.sectionLabel}>🛒 Items</div>
                {cart.map((item, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: 8,
                    }}
                  >
                    <div
                      style={{ display: 'flex', alignItems: 'center', gap: 10 }}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: 8,
                          objectFit: 'cover',
                        }}
                      />
                      <div>
                        <div
                          style={{
                            fontSize: 13,
                            fontWeight: 600,
                            color: '#1A1208',
                          }}
                        >
                          {item.name}
                        </div>
                        {item.variant && (
                          <div style={{ fontSize: 11, color: '#8B7355' }}>
                            {item.variant} · x{item.qty}
                          </div>
                        )}
                      </div>
                    </div>
                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: 700,
                        color: '#1A1208',
                      }}
                    >
                      ₹{item.price * item.qty}
                    </div>
                  </div>
                ))}
              </div>

              {/* Delivery Info */}
              <div style={styles.confirmSection}>
                <div style={styles.sectionLabel}>📍 Delivery Details</div>
                <div style={styles.confirmRow}>
                  <span style={styles.confirmKey}>Name</span>
                  <span style={styles.confirmVal}>{name}</span>
                </div>
                <div style={styles.confirmRow}>
                  <span style={styles.confirmKey}>Phone</span>
                  <span style={styles.confirmVal}>+91 {phone}</span>
                </div>
                <div style={styles.confirmRow}>
                  <span style={styles.confirmKey}>Address</span>
                  <span
                    style={{
                      ...styles.confirmVal,
                      textAlign: 'right',
                      maxWidth: '60%',
                    }}
                  >
                    {address}
                  </span>
                </div>
              </div>

              {/* Schedule */}
              <div style={styles.confirmSection}>
                <div style={styles.sectionLabel}>⏰ Order Schedule</div>
                <div style={styles.confirmRow}>
                  <span style={styles.confirmKey}>Type</span>
                  <span
                    style={{
                      ...styles.confirmVal,
                      background:
                        orderType === 'immediate' ? '#FFF0E6' : '#dcfce7',
                      color: orderType === 'immediate' ? '#FF6B2B' : '#16a34a',
                      padding: '2px 10px',
                      borderRadius: 20,
                      fontSize: 12,
                      fontWeight: 700,
                    }}
                  >
                    {orderType === 'immediate'
                      ? '⚡ Immediate'
                      : '📅 Pre-Order'}
                  </span>
                </div>
                {orderType === 'preorder' && (
                  <>
                    <div style={styles.confirmRow}>
                      <span style={styles.confirmKey}>Date</span>
                      <span style={styles.confirmVal}>
                        {selectedDate === 'today'
                          ? getTodayDate()
                          : getTomorrowDate()}
                      </span>
                    </div>
                    <div style={styles.confirmRow}>
                      <span style={styles.confirmKey}>Slot</span>
                      <span style={styles.confirmVal}>{selectedSlot}</span>
                    </div>
                  </>
                )}
              </div>

              {/* Customizations */}
              {(selectedCustomizations.length > 0 || specialNote) && (
                <div style={styles.confirmSection}>
                  <div style={styles.sectionLabel}>✨ Customisations</div>
                  {selectedCustomizations.map((c) => (
                    <div
                      key={c}
                      style={{
                        fontSize: 13,
                        color: '#FF6B2B',
                        fontWeight: 500,
                        marginBottom: 4,
                      }}
                    >
                      ✓ {c}
                    </div>
                  ))}
                  {specialNote && (
                    <div
                      style={{
                        fontSize: 12,
                        color: '#6B5744',
                        marginTop: 6,
                        background: '#FFF8F0',
                        padding: '8px 12px',
                        borderRadius: 8,
                        lineHeight: 1.6,
                      }}
                    >
                      📝 {specialNote}
                    </div>
                  )}
                </div>
              )}

              {/* Price Breakdown */}
              <div
                style={{
                  ...styles.confirmSection,
                  background: '#FFF0E6',
                  borderColor: 'rgba(255,107,43,0.2)',
                }}
              >
                <div style={styles.sectionLabel}>💰 Price Breakdown</div>
                <div style={styles.confirmRow}>
                  <span style={styles.confirmKey}>Subtotal</span>
                  <span style={styles.confirmVal}>₹{subtotal}</span>
                </div>
                <div style={styles.confirmRow}>
                  <span style={styles.confirmKey}>Delivery</span>
                  <span
                    style={{
                      ...styles.confirmVal,
                      color: orderType === 'immediate' ? '#1A1208' : '#16a34a',
                    }}
                  >
                    {orderType === 'immediate' ? '₹30' : 'FREE'}
                  </span>
                </div>
                <div
                  style={{
                    ...styles.confirmRow,
                    marginTop: 8,
                    paddingTop: 8,
                    borderTop: '1px dashed rgba(255,107,43,0.3)',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'Syne, sans-serif',
                      fontWeight: 800,
                      fontSize: 16,
                      color: '#1A1208',
                    }}
                  >
                    Total
                  </span>
                  <span
                    style={{
                      fontFamily: 'Syne, sans-serif',
                      fontWeight: 800,
                      fontSize: 20,
                      color: '#FF6B2B',
                    }}
                  >
                    ₹{total}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom CTA */}
        <div style={styles.footer}>
          {step !== 'confirm' ? (
            <button onClick={handleNext} style={styles.primaryBtn}>
              {step === 'details' ? 'Continue to Schedule →' : 'Review Order →'}
            </button>
          ) : (
            <button
              onClick={handlePlace}
              disabled={placing}
              style={{ ...styles.primaryBtn, opacity: placing ? 0.8 : 1 }}
            >
              {placing ? (
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 10,
                  }}
                >
                  <span style={styles.spinner} /> Placing Order...
                </span>
              ) : (
                `Place Order · ₹${total}`
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  overlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(26,18,8,0.6)',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
    backdropFilter: 'blur(2px)',
  },
  sheet: {
    background: '#FFF8F0',
    borderRadius: '20px 20px 0 0',
    width: '100%',
    maxWidth: 600,
    maxHeight: '92vh',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 -8px 40px rgba(26,18,8,0.2)',
    animation: 'slideUp 0.3s ease',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '18px 20px 12px',
    borderBottom: '1px solid #F0E6D9',
    flexShrink: 0,
  },
  headerTitle: {
    fontFamily: 'Syne, sans-serif',
    fontSize: 18,
    fontWeight: 800,
    color: '#1A1208',
    marginBottom: 2,
  },
  headerSub: { fontSize: 12, color: '#8B7355' },
  backBtn: {
    background: 'none',
    border: 'none',
    fontSize: 18,
    color: '#8B7355',
    cursor: 'pointer',
    padding: '0 6px 0 0',
  },
  closeBtn: {
    background: '#F0E6D9',
    border: 'none',
    borderRadius: '50%',
    width: 32,
    height: 32,
    fontSize: 14,
    color: '#8B7355',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progress: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px 20px',
    borderBottom: '1px solid #F0E6D9',
    flexShrink: 0,
  },
  progressDot: {
    width: 26,
    height: 26,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 11,
    fontWeight: 800,
    flexShrink: 0,
  },
  body: { flex: 1, overflowY: 'auto', padding: '20px' },
  footer: {
    padding: '14px 20px',
    borderTop: '1px solid #F0E6D9',
    background: '#fff',
    flexShrink: 0,
  },
  primaryBtn: {
    width: '100%',
    background: '#FF6B2B',
    color: '#fff',
    border: 'none',
    borderRadius: 14,
    padding: '15px',
    fontSize: 16,
    fontWeight: 800,
    cursor: 'pointer',
    fontFamily: 'Syne, sans-serif',
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: 800,
    color: '#8B7355',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 12,
    marginTop: 4,
  },
  cartSummary: {
    background: '#fff',
    borderRadius: 14,
    padding: '14px',
    border: '1px solid #F0E6D9',
    marginBottom: 20,
  },
  cartRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
    paddingBottom: 10,
    borderBottom: '1px solid #F0E6D9',
  },
  cartImg: {
    width: 48,
    height: 48,
    borderRadius: 8,
    objectFit: 'cover',
    flexShrink: 0,
  },
  cartItemName: {
    fontSize: 13,
    fontWeight: 600,
    color: '#1A1208',
    marginBottom: 2,
  },
  cartItemMeta: { fontSize: 11, color: '#8B7355' },
  cartItemPrice: {
    fontFamily: 'Syne, sans-serif',
    fontWeight: 800,
    fontSize: 15,
    color: '#1A1208',
  },
  cartTotal: { paddingTop: 8 },
  inputGroup: { marginBottom: 14 },
  label: {
    fontSize: 12,
    fontWeight: 700,
    color: '#6B5744',
    marginBottom: 6,
    display: 'block',
  },
  input: {
    width: '100%',
    padding: '11px 14px',
    border: '2px solid #F0E6D9',
    borderRadius: 12,
    fontSize: 14,
    fontFamily: 'DM Sans, sans-serif',
    color: '#1A1208',
    background: '#fff',
    outline: 'none',
    boxSizing: 'border-box',
  },
  errMsg: { fontSize: 11, color: '#dc2626', marginTop: 4, display: 'block' },
  orderTypeGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 },
  orderTypeCard: {
    borderRadius: 14,
    padding: '16px 14px',
    cursor: 'pointer',
    textAlign: 'center',
    transition: 'all 0.15s',
  },
  orderTypeTitle: {
    fontFamily: 'Syne, sans-serif',
    fontSize: 14,
    fontWeight: 800,
    color: '#1A1208',
    marginBottom: 4,
  },
  orderTypeSub: { fontSize: 11, color: '#8B7355', lineHeight: 1.5 },
  confirmSection: {
    background: '#fff',
    borderRadius: 14,
    padding: '14px 16px',
    border: '1px solid #F0E6D9',
    marginBottom: 12,
  },
  confirmRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  confirmKey: { fontSize: 13, color: '#8B7355' },
  confirmVal: { fontSize: 13, fontWeight: 600, color: '#1A1208' },
  spinner: {
    display: 'inline-block',
    width: 16,
    height: 16,
    borderRadius: '50%',
    border: '2px solid rgba(255,255,255,0.4)',
    borderTopColor: '#fff',
    animation: 'spin 0.7s linear infinite',
  },
}
