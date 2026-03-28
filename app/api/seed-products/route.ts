import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/categories/mongodb'
import mongoose from 'mongoose'

const StallSchema = new mongoose.Schema(
  { name: String, seeded: Boolean },
  { strict: false },
)
const ProductSchema = new mongoose.Schema({
  stallId: { type: String, required: true },
  name: String,
  price: Number,
  originalPrice: Number,
  description: String,
  variants: [String],
  image: String,
  seeded: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
})
const Stall = mongoose.models.Stall || mongoose.model('Stall', StallSchema)
const Product =
  mongoose.models.Product || mongoose.model('Product', ProductSchema)

const SEED_PRODUCTS: Record<string, any[]> = {
  seed_food_1: [
    {
      name: 'Dal Tadka + 3 Rotis',
      price: 70,
      description:
        'Creamy yellow dal with ghee tadka and soft whole wheat rotis.',
      variants: [],
      image:
        'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&q=80',
    },
    {
      name: 'Veg Thali',
      price: 120,
      originalPrice: 150,
      description: 'Complete meal: dal, 2 sabzi, rice, roti, salad and papad.',
      variants: ['Regular', 'Large'],
      image:
        'https://images.unsplash.com/photo-1567337710282-00832b415979?w=400&q=80',
    },
    {
      name: 'Aloo Paratha (2 pcs)',
      price: 60,
      description:
        'Stuffed with spiced potato filling, served with curd and pickle.',
      variants: [],
      image:
        'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&q=80',
    },
    {
      name: 'Khichdi + Papad',
      price: 80,
      description:
        'Comfort food — moong dal khichdi with ghee, served with crispy papad.',
      variants: [],
      image:
        'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&q=80',
    },
  ],
  seed_food_2: [
    {
      name: 'Chicken Dum Biryani',
      price: 180,
      originalPrice: 220,
      description:
        'Slow-cooked Hyderabadi dum biryani with tender chicken pieces.',
      variants: ['Half', 'Full'],
      image:
        'https://images.unsplash.com/photo-1563379091339-03246963d26d?w=400&q=80',
    },
    {
      name: 'Veg Biryani',
      price: 140,
      description:
        'Fragrant basmati rice with mixed vegetables and whole spices.',
      variants: ['Half', 'Full'],
      image:
        'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&q=80',
    },
    {
      name: 'Raita + Salan',
      price: 50,
      description:
        'Creamy boondi raita and spicy mirchi salan — perfect biryani companions.',
      variants: [],
      image:
        'https://images.unsplash.com/photo-1505253758473-96b7015fcd40?w=400&q=80',
    },
  ],
  seed_food_3: [
    {
      name: 'Odia Thali',
      price: 130,
      description: 'Dalma, saga bhaja, macha curry, rice, khatta and papad.',
      variants: [],
      image:
        'https://images.unsplash.com/photo-1567337710282-00832b415979?w=400&q=80',
    },
    {
      name: 'Pakhala Bhat',
      price: 80,
      description:
        'Fermented rice with fried fish, saga and badi chura. Summer special.',
      variants: [],
      image:
        'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&q=80',
    },
  ],
  seed_jwl_1: [
    {
      name: 'Silver Jhumka Earrings',
      price: 450,
      originalPrice: 600,
      description:
        'Handcrafted pure silver jhumkas with intricate filigree work.',
      variants: ['Small', 'Large'],
      image:
        'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&q=80',
    },
    {
      name: 'Oxidised Necklace Set',
      price: 780,
      originalPrice: 1000,
      description: 'Statement oxidised silver necklace with matching earrings.',
      variants: [],
      image:
        'https://images.unsplash.com/photo-1601121141461-9d6647bef0a4?w=400&q=80',
    },
    {
      name: 'Silver Toe Ring (pair)',
      price: 220,
      description: 'Traditional silver toe rings, adjustable size.',
      variants: [],
      image:
        'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&q=80',
    },
    {
      name: 'Kundan Bangles (set of 4)',
      price: 550,
      originalPrice: 700,
      description: 'Gold-plated kundan bangles with colorful stone setting.',
      variants: ['2.4', '2.6', '2.8'],
      image:
        'https://images.unsplash.com/photo-1573408301185-9519f94816b5?w=400&q=80',
    },
  ],
  seed_jwl_2: [
    {
      name: 'Meenakari Pendant Set',
      price: 890,
      originalPrice: 1200,
      description:
        'Vibrant Rajasthani meenakari pendant with matching earrings.',
      variants: ['Blue', 'Red', 'Green'],
      image:
        'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&q=80',
    },
    {
      name: 'Tribal Choker',
      price: 650,
      description: 'Oxidised metal tribal choker inspired by Odia folk art.',
      variants: [],
      image:
        'https://images.unsplash.com/photo-1601121141461-9d6647bef0a4?w=400&q=80',
    },
  ],
  seed_candle_1: [
    {
      name: 'Lavender Dream Candle',
      price: 320,
      originalPrice: 400,
      description:
        'Pure soy wax candle with calming lavender essential oil. Burns 45+ hrs.',
      variants: ['100g', '200g'],
      image:
        'https://images.unsplash.com/photo-1602607919180-ace88d9f0dba?w=400&q=80',
    },
    {
      name: 'Rose & Oud Candle',
      price: 380,
      description:
        'Romantic blend of Bulgarian rose and woody oud. Perfect for evenings.',
      variants: ['100g', '200g'],
      image:
        'https://images.unsplash.com/photo-1571781418606-70265b9cce90?w=400&q=80',
    },
    {
      name: 'Vanilla Chai Candle',
      price: 290,
      description:
        'Warm spiced chai and creamy vanilla — a cozy Indian home in a jar.',
      variants: ['100g'],
      image:
        'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=400&q=80',
    },
    {
      name: 'Gift Set (3 candles)',
      price: 799,
      originalPrice: 1050,
      description:
        'Set of 3 bestseller candles — Lavender, Rose Oud and Vanilla Chai.',
      variants: [],
      image:
        'https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=400&q=80',
    },
  ],
  seed_candle_2: [
    {
      name: 'Reed Diffuser - Jasmine',
      price: 420,
      description:
        '100ml jasmine reed diffuser, lasts 60 days. Includes 8 reeds.',
      variants: [],
      image:
        'https://images.unsplash.com/photo-1571781418606-70265b9cce90?w=400&q=80',
    },
    {
      name: 'Wax Melt Set',
      price: 250,
      originalPrice: 320,
      description: '6 scented wax melts in floral, citrus and woody variants.',
      variants: [],
      image:
        'https://images.unsplash.com/photo-1602607919180-ace88d9f0dba?w=400&q=80',
    },
  ],
  seed_gift_1: [
    {
      name: 'Custom Name Frame',
      price: 499,
      description:
        'Personalized wooden photo frame with laser-engraved name. A5 size.',
      variants: ['Natural Wood', 'Black', 'White'],
      image:
        'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400&q=80',
    },
    {
      name: 'Birthday Hamper',
      price: 899,
      originalPrice: 1200,
      description:
        'Curated birthday box: candle, chocolates, card and personalised note.',
      variants: ['For Him', 'For Her'],
      image:
        'https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=400&q=80',
    },
    {
      name: 'Engraved Keychain',
      price: 199,
      description:
        'Stainless steel keychain with custom name or date engraved.',
      variants: ['Round', 'Rectangle', 'Heart'],
      image:
        'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400&q=80',
    },
  ],
  seed_gift_2: [
    {
      name: 'Festival Gift Box',
      price: 750,
      originalPrice: 950,
      description:
        'Eco-friendly box with dry fruits, candle, and handwritten card.',
      variants: ['Diwali', 'Holi', 'Birthday'],
      image:
        'https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=400&q=80',
    },
    {
      name: 'Couple Memory Box',
      price: 1100,
      description:
        'Personalised memory box with photos, notes and small keepsakes.',
      variants: [],
      image:
        'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400&q=80',
    },
  ],
  seed_craft_1: [
    {
      name: 'Pattachitra Painting (A4)',
      price: 650,
      originalPrice: 850,
      description:
        'Hand-painted Odia Pattachitra on cloth canvas. Each piece is unique.',
      variants: ['Jagannath', 'Radha-Krishna', 'Nature'],
      image:
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
    },
    {
      name: 'Dhokra Ganesha',
      price: 780,
      description:
        'Lost-wax cast Dhokra brass Ganesha idol. Tribal art from Odisha.',
      variants: ['Small', 'Medium'],
      image:
        'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400&q=80',
    },
    {
      name: 'Sabai Grass Basket',
      price: 350,
      description: 'Handwoven sabai grass basket, eco-friendly and durable.',
      variants: ['Small', 'Large'],
      image:
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
    },
  ],
  seed_craft_2: [
    {
      name: 'Hand-painted Pot',
      price: 280,
      originalPrice: 380,
      description:
        'Terracotta pot with hand-painted floral design. Perfect for plants.',
      variants: ['4 inch', '6 inch', '8 inch'],
      image:
        'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400&q=80',
    },
    {
      name: 'Warli Wall Art Panel',
      price: 550,
      description:
        'MDF board with traditional Warli tribal art. Ready to hang.',
      variants: ['A4', 'A3'],
      image:
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
    },
  ],
  seed_organic_1: [
    {
      name: 'Organic Vegetable Box',
      price: 220,
      description:
        '2kg seasonal organic vegetables — straight from the farm, no pesticides.',
      variants: ['2kg', '5kg'],
      image:
        'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&q=80',
    },
    {
      name: 'Cold Pressed Coconut Oil',
      price: 340,
      originalPrice: 420,
      description:
        '500ml pure cold-pressed virgin coconut oil. Great for cooking and hair.',
      variants: ['250ml', '500ml'],
      image:
        'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&q=80',
    },
    {
      name: 'Forest Honey (500g)',
      price: 380,
      description:
        'Raw unprocessed forest honey. Rich in antioxidants and enzymes.',
      variants: ['250g', '500g', '1kg'],
      image:
        'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&q=80',
    },
  ],
  seed_organic_2: [
    {
      name: 'Organic Masala Kit',
      price: 299,
      originalPrice: 399,
      description:
        '5 essential spices — turmeric, cumin, coriander, chilli and garam masala.',
      variants: [],
      image:
        'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&q=80',
    },
    {
      name: 'Herbal Green Tea (50g)',
      price: 180,
      description:
        'Hand-rolled green tea with tulsi and ginger. 25 cups per pack.',
      variants: ['Plain', 'Tulsi Ginger', 'Lemon Mint'],
      image:
        'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&q=80',
    },
  ],
  seed_bake_1: [
    {
      name: 'Sourdough Loaf',
      price: 220,
      description:
        '800g hand-crafted sourdough with 18-hr cold fermentation. Crusty outside, chewy inside.',
      variants: ['Plain', 'Seeded', 'Garlic Herb'],
      image:
        'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&q=80',
    },
    {
      name: 'Croissant (pack of 4)',
      price: 180,
      originalPrice: 240,
      description: 'Buttery all-butter croissants baked fresh each morning.',
      variants: ['Plain', 'Chocolate', 'Almond'],
      image:
        'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&q=80',
    },
    {
      name: 'Custom Birthday Cake',
      price: 799,
      description:
        '500g custom cake with your message. Choose flavor and frosting.',
      variants: ['Chocolate', 'Vanilla', 'Red Velvet', 'Black Forest'],
      image:
        'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=80',
    },
  ],
  seed_bake_2: [
    {
      name: 'Dark Chocolate Brownie (6 pcs)',
      price: 280,
      originalPrice: 350,
      description:
        'Fudgy Belgian chocolate brownies. Crispy top, gooey centre.',
      variants: ['Plain', 'Walnut', 'Oreo'],
      image:
        'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=80',
    },
    {
      name: 'Macaron Box (12 pcs)',
      price: 480,
      description:
        'Assorted French macarons in 6 flavors. Perfect for gifting.',
      variants: ['Assorted', 'All Chocolate', 'Pastel Mix'],
      image:
        'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=80',
    },
    {
      name: 'Lemon Tart',
      price: 160,
      description:
        'Buttery pastry shell with tangy lemon curd and meringue topping.',
      variants: ['Single', 'Box of 4'],
      image:
        'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&q=80',
    },
  ],
}

export async function GET() {
  try {
    await connectDB()

    const stalls = await Stall.collection.find({ seeded: true }).toArray()
    let totalUpserted = 0

    for (const stall of stalls) {
      const seedKey = stall.id as string
      const prods = SEED_PRODUCTS[seedKey]
      if (!prods) continue

      for (const p of prods) {
        await Product.collection.updateOne(
          { stallId: String(stall._id), name: p.name, seeded: true },
          { $set: { ...p, stallId: String(stall._id), seeded: true } },
          { upsert: true },
        )
        totalUpserted++
      }
    }

    return NextResponse.json({
      message: 'Seed products upserted',
      totalUpserted,
    })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
