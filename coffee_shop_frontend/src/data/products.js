export const CATEGORY = [
  { key: "all", label: "Tất cả" },
  { key: "coffee", label: "Cà phê" },
  { key: "espresso", label: "Espresso" },
  { key: "tea", label: "Trà" },
  { key: "freeze", label: "Freeze" },
  { key: "cake", label: "Bánh" },
  { key: "other", label: "Khác" },
  { key: "favorite", label: "Hương vị riêng của bạn"}
];

export const productsData = [
  // CÀ PHÊ PHIN
  { 
    id: 1, 
    name: "Phin Sữa Đá", 
    price: 39000, 
    category: "coffee", 
    likes: 1284, 
    rating: 4.8,
    reviews: 368,
    sold: 1520,
    description: "Hương vị cà phê truyền thống được pha chế từ những hạt Robust thượng hạng, kết hợp cùng sữa đặc tạo nên sự cân bằng hoàn hảo.",
    image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?w=800",
    gallery: [
        "https://images.unsplash.com/photo-1541167760496-1628856ab772?w=800",
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800",
        "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800"
    ],
    isBestSeller: true,
    discount: 30
  },
  { 
    id: 2, 
    name: "Phin Đen Đá", 
    price: 35000, 
    category: "coffee", 
    likes: 963, 
    rating: 4.5,
    reviews: 124,
    description: "Dành cho những tâm hồn yêu thích sự nguyên bản, mạnh mẽ của cà phê phin Việt Nam.",
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800" ,
    isBestSeller: false
  },
  { id: 4, name: "PhinDi Hạnh Nhân", price: 49000, category: "coffee", likes: 2156, rating: 4.9, reviews: 852, image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800", isBestSeller: true, discount: 15 },
  { id: 11, name: "Trà Sen Vàng (củ năng)", price: 55000, category: "tea", likes: 921, rating: 4.7, reviews: 412, image: "https://images.unsplash.com/photo-1563822249366-3efb23b8e0c9?w=800", isBestSeller: true, discount: 10 },
  { id: 12, name: "Trà Ngọc Trai Dâu Tằm", price: 59000, category: "tea", likes: 1348, rating: 4.6, reviews: 215, image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800", isBestSeller: false },
  { id: 16, name: "Freeze Trà Xanh", price: 65000, category: "freeze", likes: 2034, rating: 4.8, reviews: 963, image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800", isBestSeller: true },
  { id: 17, name: "Kem Mây Dâu Tằm", price: 69000, category: "freeze", likes: 1897, rating: 4.7, reviews: 542, image: "https://images.unsplash.com/photo-1579954115541-b4499b0b65cf?w=800", isBestSeller: false },
  { id: 21, name: "Bánh Mì Que Gà Phô Mai", price: 19000, category: "cake", likes: 2341, rating: 4.9, reviews: 1102, image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800", isBestSeller: true },
  { id: 23, name: "Bánh Tiramisu", price: 35000, category: "cake", likes: 1456, rating: 4.8, reviews: 324, image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800", isBestSeller: false },
  // ... Có thể thêm các món khác vào đây
];
