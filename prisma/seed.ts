import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not defined in .env");
}

const adapter = new PrismaPg({
  connectionString,
});

const prisma = new PrismaClient({
  adapter,
});

const customers = [
  {
    id: "cust-001",
    name: "Aarav Sharma",
    email: "aarav@example.com",
    phone: "+91-9000000001",
  },
  {
    id: "cust-002",
    name: "Priya Verma",
    email: "priya@example.com",
    phone: "+91-9000000002",
  },
  {
    id: "cust-003",
    name: "Rahul Mehta",
    email: "rahul@example.com",
    phone: "+91-9000000003",
  },
  {
    id: "cust-004",
    name: "Ananya Singh",
    email: "ananya@example.com",
    phone: "+91-9000000004",
  },
  {
    id: "cust-005",
    name: "Arjun Kapoor",
    email: "arjun@example.com",
    phone: "+91-9000000005",
  },
  {
    id: "cust-006",
    name: "Sneha Patel",
    email: "sneha@example.com",
    phone: "+91-9000000006",
  },
  {
    id: "cust-007",
    name: "Vikram Gupta",
    email: "vikram@example.com",
    phone: "+91-9000000007",
  },
  {
    id: "cust-008",
    name: "Neha Reddy",
    email: "neha@example.com",
    phone: "+91-9000000008",
  },
  {
    id: "cust-009",
    name: "Rohan Malhotra",
    email: "rohan@example.com",
    phone: "+91-9000000009",
  },
  {
    id: "cust-010",
    name: "Isha Nair",
    email: "isha@example.com",
    phone: "+91-9000000010",
  },
  {
    id: "cust-011",
    name: "Karan Joshi",
    email: "karan@example.com",
    phone: "+91-9000000011",
  },
  {
    id: "cust-012",
    name: "Meera Iyer",
    email: "meera@example.com",
    phone: "+91-9000000012",
  },
  {
    id: "cust-013",
    name: "Aditya Rao",
    email: "aditya@example.com",
    phone: "+91-9000000013",
  },
  {
    id: "cust-014",
    name: "Simran Kaur",
    email: "simran@example.com",
    phone: "+91-9000000014",
  },
  {
    id: "cust-015",
    name: "Dev Agarwal",
    email: "dev@example.com",
    phone: "+91-9000000015",
  },
];

async function main() {
  console.log("🌱 Starting database seed...");

  // Clear existing data
  await prisma.refundRequest.deleteMany();
  await prisma.order.deleteMany();
  await prisma.agentLog.deleteMany();
  await prisma.customer.deleteMany();

  // Create customers
  for (const customer of customers) {
    await prisma.customer.create({
      data: customer,
    });
  }

  console.log("✅ Created 15 customers");

  // Create orders
  const orders = [
    {
      id: "ORD-1001",
      customerId: "cust-001",
      amount: 149.99,
      status: "DELIVERED",
      orderDate: new Date("2026-08-01"),
      deliveryDate: new Date("2026-08-05"),
      productName: "Wireless Headphones",
      isFinalSale: false,
      isDigital: false,
      isDownloaded: false,
    },
    {
      id: "ORD-1002",
      customerId: "cust-001",
      amount: 79.99,
      status: "DELIVERED",
      orderDate: new Date("2026-06-01"),
      deliveryDate: new Date("2026-06-05"),
      productName: "Mechanical Keyboard",
      isFinalSale: false,
      isDigital: false,
      isDownloaded: false,
    },

    {
      id: "ORD-1003",
      customerId: "cust-002",
      amount: 299.99,
      status: "DELIVERED",
      orderDate: new Date("2026-08-02"),
      deliveryDate: new Date("2026-08-06"),
      productName: "Smart Watch",
      isFinalSale: false,
      isDigital: false,
      isDownloaded: false,
    },
    {
      id: "ORD-1004",
      customerId: "cust-002",
      amount: 49.99,
      status: "DELIVERED",
      orderDate: new Date("2026-05-01"),
      deliveryDate: new Date("2026-05-05"),
      productName: "USB-C Hub",
      isFinalSale: false,
      isDigital: false,
      isDownloaded: false,
    },

    {
      id: "ORD-1005",
      customerId: "cust-003",
      amount: 599.99,
      status: "DELIVERED",
      orderDate: new Date("2026-08-03"),
      deliveryDate: new Date("2026-08-07"),
      productName: "4K Monitor",
      isFinalSale: false,
      isDigital: false,
      isDownloaded: false,
    },
    {
      id: "ORD-1006",
      customerId: "cust-003",
      amount: 89.99,
      status: "DELIVERED",
      orderDate: new Date("2026-07-01"),
      deliveryDate: new Date("2026-07-05"),
      productName: "Gaming Mouse",
      isFinalSale: false,
      isDigital: false,
      isDownloaded: false,
    },

    {
      id: "ORD-1007",
      customerId: "cust-004",
      amount: 199.99,
      status: "DELIVERED",
      orderDate: new Date("2026-05-01"),
      deliveryDate: new Date("2026-05-05"),
      productName: "Bluetooth Speaker",
      isFinalSale: false,
      isDigital: false,
      isDownloaded: false,
    },
    {
      id: "ORD-1008",
      customerId: "cust-004",
      amount: 39.99,
      status: "DELIVERED",
      orderDate: new Date("2026-08-04"),
      deliveryDate: new Date("2026-08-08"),
      productName: "Phone Case",
      isFinalSale: true,
      isDigital: false,
      isDownloaded: false,
    },

    {
      id: "ORD-1009",
      customerId: "cust-005",
      amount: 129.99,
      status: "DELIVERED",
      orderDate: new Date("2026-08-05"),
      deliveryDate: new Date("2026-08-09"),
      productName: "Webcam",
      isFinalSale: false,
      isDigital: false,
      isDownloaded: false,
    },
    {
      id: "ORD-1010",
      customerId: "cust-005",
      amount: 59.99,
      status: "DELIVERED",
      orderDate: new Date("2026-07-20"),
      deliveryDate: new Date("2026-07-24"),
      productName: "Laptop Stand",
      isFinalSale: false,
      isDigital: false,
      isDownloaded: false,
    },

    {
      id: "ORD-1011",
      customerId: "cust-006",
      amount: 24.99,
      status: "DELIVERED",
      orderDate: new Date("2026-08-06"),
      deliveryDate: new Date("2026-08-10"),
      productName: "Phone Charger",
      isFinalSale: false,
      isDigital: false,
      isDownloaded: false,
    },
    {
      id: "ORD-1012",
      customerId: "cust-006",
      amount: 19.99,
      status: "DELIVERED",
      orderDate: new Date("2026-08-07"),
      deliveryDate: new Date("2026-08-11"),
      productName: "Digital Ebook",
      isFinalSale: false,
      isDigital: true,
      isDownloaded: true,
    },

    {
      id: "ORD-1013",
      customerId: "cust-007",
      amount: 399.99,
      status: "DELIVERED",
      orderDate: new Date("2026-08-01"),
      deliveryDate: new Date("2026-08-05"),
      productName: "Tablet",
      isFinalSale: false,
      isDigital: false,
      isDownloaded: false,
    },
    {
      id: "ORD-1014",
      customerId: "cust-007",
      amount: 699.99,
      status: "DELIVERED",
      orderDate: new Date("2026-08-02"),
      deliveryDate: new Date("2026-08-06"),
      productName: "Laptop",
      isFinalSale: false,
      isDigital: false,
      isDownloaded: false,
    },

    {
      id: "ORD-1015",
      customerId: "cust-008",
      amount: 149.99,
      status: "SHIPPED",
      orderDate: new Date("2026-08-15"),
      deliveryDate: null,
      productName: "Smart Speaker",
      isFinalSale: false,
      isDigital: false,
      isDownloaded: false,
    },
    {
      id: "ORD-1016",
      customerId: "cust-008",
      amount: 89.99,
      status: "DELIVERED",
      orderDate: new Date("2026-07-25"),
      deliveryDate: new Date("2026-07-29"),
      productName: "Keyboard",
      isFinalSale: false,
      isDigital: false,
      isDownloaded: false,
    },

    {
      id: "ORD-1017",
      customerId: "cust-009",
      amount: 249.99,
      status: "DELIVERED",
      orderDate: new Date("2026-08-08"),
      deliveryDate: new Date("2026-08-12"),
      productName: "Noise Cancelling Earbuds",
      isFinalSale: false,
      isDigital: false,
      isDownloaded: false,
    },
    {
      id: "ORD-1018",
      customerId: "cust-009",
      amount: 109.99,
      status: "DELIVERED",
      orderDate: new Date("2026-06-01"),
      deliveryDate: new Date("2026-06-05"),
      productName: "Fitness Tracker",
      isFinalSale: false,
      isDigital: false,
      isDownloaded: false,
    },

    {
      id: "ORD-1019",
      customerId: "cust-010",
      amount: 179.99,
      status: "DELIVERED",
      orderDate: new Date("2026-08-09"),
      deliveryDate: new Date("2026-08-13"),
      productName: "Portable SSD",
      isFinalSale: false,
      isDigital: false,
      isDownloaded: false,
    },
    {
      id: "ORD-1020",
      customerId: "cust-010",
      amount: 44.99,
      status: "DELIVERED",
      orderDate: new Date("2026-08-10"),
      deliveryDate: new Date("2026-08-14"),
      productName: "Wireless Mouse",
      isFinalSale: false,
      isDigital: false,
      isDownloaded: false,
    },

    {
      id: "ORD-1021",
      customerId: "cust-011",
      amount: 349.99,
      status: "DELIVERED",
      orderDate: new Date("2026-08-11"),
      deliveryDate: new Date("2026-08-15"),
      productName: "Smartphone",
      isFinalSale: false,
      isDigital: false,
      isDownloaded: false,
    },
    {
      id: "ORD-1022",
      customerId: "cust-011",
      amount: 699.99,
      status: "DELIVERED",
      orderDate: new Date("2026-08-01"),
      deliveryDate: new Date("2026-08-05"),
      productName: "Premium Laptop",
      isFinalSale: false,
      isDigital: false,
      isDownloaded: false,
    },

    {
      id: "ORD-1023",
      customerId: "cust-012",
      amount: 69.99,
      status: "DELIVERED",
      orderDate: new Date("2026-08-12"),
      deliveryDate: new Date("2026-08-16"),
      productName: "Bluetooth Keyboard",
      isFinalSale: false,
      isDigital: false,
      isDownloaded: false,
    },
    {
      id: "ORD-1024",
      customerId: "cust-012",
      amount: 29.99,
      status: "DELIVERED",
      orderDate: new Date("2026-07-10"),
      deliveryDate: new Date("2026-07-14"),
      productName: "USB Cable Pack",
      isFinalSale: false,
      isDigital: false,
      isDownloaded: false,
    },

    {
      id: "ORD-1025",
      customerId: "cust-013",
      amount: 449.99,
      status: "DELIVERED",
      orderDate: new Date("2026-08-13"),
      deliveryDate: new Date("2026-08-17"),
      productName: "Gaming Console",
      isFinalSale: false,
      isDigital: false,
      isDownloaded: false,
    },
    {
      id: "ORD-1026",
      customerId: "cust-013",
      amount: 79.99,
      status: "DELIVERED",
      orderDate: new Date("2026-08-14"),
      deliveryDate: new Date("2026-08-18"),
      productName: "Game Controller",
      isFinalSale: false,
      isDigital: false,
      isDownloaded: false,
    },

    {
      id: "ORD-1027",
      customerId: "cust-014",
      amount: 99.99,
      status: "DELIVERED",
      orderDate: new Date("2026-08-15"),
      deliveryDate: new Date("2026-08-19"),
      productName: "Smart Bulbs",
      isFinalSale: false,
      isDigital: false,
      isDownloaded: false,
    },
    {
      id: "ORD-1028",
      customerId: "cust-014",
      amount: 34.99,
      status: "DELIVERED",
      orderDate: new Date("2026-08-16"),
      deliveryDate: new Date("2026-08-20"),
      productName: "Power Bank",
      isFinalSale: false,
      isDigital: false,
      isDownloaded: false,
    },

    {
      id: "ORD-1029",
      customerId: "cust-015",
      amount: 199.99,
      status: "DELIVERED",
      orderDate: new Date("2026-08-16"),
      deliveryDate: new Date("2026-08-20"),
      productName: "Smart Display",
      isFinalSale: false,
      isDigital: false,
      isDownloaded: false,
    },
    {
      id: "ORD-1030",
      customerId: "cust-015",
      amount: 59.99,
      status: "DELIVERED",
      orderDate: new Date("2026-08-17"),
      deliveryDate: new Date("2026-08-21"),
      productName: "Wireless Charger",
      isFinalSale: false,
      isDigital: false,
      isDownloaded: false,
    },
  ];

  for (const order of orders) {
    await prisma.order.create({
      data: order,
    });
  }

  console.log(`✅ Created ${orders.length} orders`);
  console.log("🎉 Database seed completed successfully!");
}

main()
  .catch((error) => {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });