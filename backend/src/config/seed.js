require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../models/User");
const Category = require("../models/Category");
const Product = require("../models/Product");

const categories = [
  { name: "Packaged Foods", slug: "packaged-food", description: "Atta, rice, pulses, oils, spices, snacks, biscuits, noodles and breakfast staples — the essentials every household stocks.", icon: "🥫", color: "#FF6B35" },
  { name: "Beverages", slug: "beverages", description: "Soft drinks, juices, packaged water, energy drinks and ready-to-drink teas. Always cold-chain maintained and freshness-guaranteed.", icon: "🥤", color: "#4ECDC4" },
  { name: "Personal Care", slug: "personal-care", description: "Soaps, shampoos, conditioners, face wash, deodorants, toothpaste and hygiene essentials from India's leading brands.", icon: "🧴", color: "#A855F7" },
  { name: "Household Products", slug: "household-products", description: "Detergents, floor cleaners, dishwashing liquids, air fresheners and surface disinfectants for a clean, healthy home.", icon: "🏠", color: "#3B82F6" },
  { name: "Daily Essentials", slug: "daily-essentials", description: "Everyday must-haves — salt, sugar, tea, coffee, matchboxes and more. Never run out of the basics.", icon: "🛒", color: "#10B981" },
  { name: "Dairy & Eggs", slug: "dairy-eggs", description: "Fresh Amul butter, cheese, paneer, milk and tetra-pack dairy products. Stocked fresh, supplied efficiently.", icon: "🥛", color: "#F59E0B" },
];

const productData = [
  { name: "Aashirvaad Atta (10 kg)", description: "Premium whole wheat flour milled from select grains. Makes soft, healthy rotis that the whole family will love. India's most trusted atta brand.", brand: "ITC — Aashirvaad", unit: "bag", price: 350, featured: true, tags: ["atta", "wheat", "flour"], imageUrl: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400" },
  { name: "Fortune Sunflower Oil (5 L)", description: "Pure sunflower cooking oil with zero cholesterol, rich in Vitamin E and perfect for daily cooking. Light on the heart, full of goodness.", brand: "Adani Wilmar — Fortune", unit: "bottle", price: 650, featured: true, tags: ["oil", "cooking", "sunflower"], imageUrl: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400" },
  { name: "Maggi Noodles (12-pack)", description: "India's favourite 2-minute noodles. Quick, tasty, and loved by children and adults alike. A household staple from Nestlé.", brand: "Nestlé — Maggi", unit: "pack", price: 144, featured: true, tags: ["noodles", "instant", "snack"], imageUrl: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=400" },
  { name: "Tata Salt Iodised (1 kg)", description: "Vacuum-evaporated iodised salt for healthy cooking. Tata Salt is India's most trusted table salt — pure, hygienic and consistent.", brand: "Tata Consumer Products", unit: "packet", price: 22, tags: ["salt", "iodised", "cooking"], imageUrl: "https://images.unsplash.com/photo-1518110925495-5fe2fda0442c?w=400" },
  { name: "Coca-Cola (2 L)", description: "The world's most beloved cola. Refreshing, ice-cold and perfect for every occasion — from daily meals to celebrations.", brand: "Coca-Cola India", unit: "bottle", price: 85, featured: true, tags: ["cola", "soft drink", "beverage"], imageUrl: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=400" },
  { name: "Tropicana Orange Juice (1 L)", description: "100% pure orange juice with no added sugar or preservatives. Packed with Vitamin C for a naturally energising start to the day.", brand: "PepsiCo — Tropicana", unit: "tetra pack", price: 120, tags: ["juice", "orange", "vitamin c"], imageUrl: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400" },
  { name: "Red Bull Energy Drink (250 ml)", description: "The world's leading energy drink. Red Bull Gives You Wings — with caffeine, taurine and B-vitamins to keep you alert and focused.", brand: "Red Bull", unit: "can", price: 125, tags: ["energy drink", "caffeine", "sports"], imageUrl: "https://images.unsplash.com/photo-1622543925917-763c34d1a86e?w=400" },
  { name: "Dove Moisturising Bar (3-pack)", description: "Dove Beauty Bar with 1/4 moisturising cream. Gently cleanses while nourishing your skin — noticeably softer, smoother skin from the very first wash.", brand: "HUL — Dove", unit: "pack", price: 180, tags: ["soap", "moisturising", "beauty"], imageUrl: "https://images.unsplash.com/photo-1585421514738-01798e348b17?w=400" },
  { name: "Head & Shoulders Anti-Dandruff Shampoo (400 ml)", description: "Clinically proven to eliminate dandruff and prevent its return. Leaves hair clean, strong, and full of life. Used and trusted by millions.", brand: "P&G — Head & Shoulders", unit: "bottle", price: 275, tags: ["shampoo", "anti-dandruff", "hair care"], imageUrl: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400" },
  { name: "Colgate Strong Teeth Toothpaste (200 g)", description: "India's #1 toothpaste for strong teeth and fresh breath. With Active Calcium and Amino Fluoride to fight cavities and strengthen enamel.", brand: "Colgate-Palmolive", unit: "tube", price: 80, tags: ["toothpaste", "dental", "oral care"], imageUrl: "https://images.unsplash.com/photo-1559591935-c49eca0ad9c2?w=400" },
  { name: "Lizol Floor Cleaner (2 L)", description: "Kills 99.9% of germs on floors. The trusted choice for Indian homes — effective against bacteria, fungi and viruses with a pleasant fragrance.", brand: "Reckitt — Lizol", unit: "bottle", price: 220, tags: ["floor cleaner", "disinfectant", "household"], imageUrl: "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400" },
  { name: "Surf Excel Easy Wash Detergent (4 kg)", description: "Removes the toughest stains in the first wash. Surf Excel Easy Wash is specially formulated for bucket washing — less effort, more clean.", brand: "HUL — Surf Excel", unit: "pack", price: 450, tags: ["detergent", "laundry", "washing"], imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400" },
  { name: "Amul Butter (500 g)", description: "Rich, creamy, and utterly delicious. Made from fresh cream by India's dairy cooperative, Amul Butter is the perfect companion for every meal.", brand: "Amul (GCMMF)", unit: "pack", price: 225, tags: ["butter", "dairy", "amul"], imageUrl: "https://images.unsplash.com/photo-1589985270958-bf087c1e4798?w=400" },
  { name: "Amul Taaza Full Cream Milk (1 L)", description: "Fresh pasteurised full cream milk from India's most trusted dairy brand. Packed with calcium and protein for the whole family.", brand: "Amul (GCMMF)", unit: "pouch", price: 68, tags: ["milk", "dairy", "fresh"], imageUrl: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400" },
  { name: "Parle-G Glucose Biscuits (1 kg)", description: "The world's largest-selling biscuit. Parle-G is a beloved Indian classic — wholesome, energy-giving and perfect for any time of day.", brand: "Parle Products", unit: "pack", price: 55, featured: true, tags: ["biscuits", "glucose", "snack"], imageUrl: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400" },
  { name: "Dettol Original Handwash (500 ml)", description: "India's most trusted antibacterial handwash. Kills 100 illness-causing germs and provides up to 12 hours of germ protection for the whole family.", brand: "Reckitt — Dettol", unit: "bottle", price: 120, tags: ["handwash", "antibacterial", "hygiene"], imageUrl: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=400" },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/prakash_agency");
    console.log("✅ MongoDB connected");

    const existingAdmin = await User.findOne({ email: "admin@prakashagency.com" });
    if (!existingAdmin) {
      await User.create({ name: "Admin", email: "admin@prakashagency.com", password: "Admin@123456", role: "admin" });
      console.log("✅ Admin user created: admin@prakashagency.com / Admin@123456");
    } else {
      console.log("ℹ️  Admin user already exists");
    }

    await Category.deleteMany({});
    const createdCategories = await Category.insertMany(categories);
    console.log("✅ Categories seeded:", createdCategories.length);

    const catBySlug = {};
    createdCategories.forEach(c => { catBySlug[c.slug] = c._id.toString(); });

    await Product.deleteMany({});
    const productsToInsert = productData.map((p, i) => ({
      ...p,
      category: createdCategories[Math.floor(i / 3) % createdCategories.length]._id,
      inStock: true,
    }));
    await Product.insertMany(productsToInsert);
    console.log("✅ Products seeded:", productsToInsert.length);

    console.log("\n🎉 Database seeded successfully!");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("Admin login: admin@prakashagency.com");
    console.log("Password:    Admin@123456");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seed error:", err);
    process.exit(1);
  }
}

seed();
