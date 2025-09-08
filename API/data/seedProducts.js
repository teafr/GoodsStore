import Product from '../models/product.model.js';
import connectDB from '../config/database.js';

const sampleProducts = [
  { name: 'Apple', price: 1.2, unit: 'kg', imageUrl: 'https://www.collinsdictionary.com/images/full/apple_158989157.jpg' },
  { name: 'Banana', price: 10.0, unit: 'kg', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Banana-Single.jpg' },
  { name: 'Milk', price: 1.5, unit: 'liter', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdLYLrpcL-2TKZDY0eljDthboDPMytCCRgVg&s' },
  { name: 'Bread', price: 1.0, unit: 'loaf', imageUrl: 'https://www.backerhausveit.com/wp-content/uploads/2021/03/17783-1.jpg' },
  { name: 'Cheese', price: 3.5, unit: 'block', imageUrl: 'https://www.schultzscheese.com/wp-content/uploads/2015/06/swiss.jpg' },
  { name: 'Orange', price: 1.1, unit: 'kg', imageUrl: 'https://www.quanta.org/orange/orange.jpg' },
  { name: 'Tomato', price: 2.0, unit: 'kg', imageUrl: 'https://source.washu.edu/app/uploads/2015/11/Tomato250.jpg' },
  { name: 'Cucumber', price: 1.3, unit: 'kg', imageUrl: 'https://lh3.googleusercontent.com/proxy/uAP0COl6pYdMYCK7qQ8ByEIj5vJxItD15VJPNG2e-h9sN31B3oHsfGDMCMXEKMgJqD4PWXmRIE5fbKOCQL_iVyFAEFWARtIlh5Tm3yzZSmjyplOJYj_4wYSQuZIABHcKdQu1NsZrCmjoZJfwxL4S' },
  { name: 'Chicken Breast', price: 5.5, unit: 'kg', imageUrl: 'https://platform.relish.com/wp-content/uploads/2023/06/Boneless-Skinless-Chicken-Breast.png' },
  { name: 'Eggs', price: 2.5, unit: 'dozen', imageUrl: 'https://www.shutterstock.com/image-photo/front-view-brown-chicken-eggs-600nw-2478886423.jpg' },
  { name: 'Beef Steak', price: 50.0, unit: 'kg', imageUrl: 'https://images.silpo.ua/v2/products/1600x1600/webp/bd1e6535-5f1f-4322-9c7c-6dff59cf241c.png' },
  { name: 'Salmon', price: 100.0, unit: 'kg', imageUrl: 'https://www.bigsams.in/wp-content/uploads/2022/02/Fresh-Norwegian-Salmon-Steaks.jpg' },
  { name: 'Rice', price: 6.0, unit: 'kg', imageUrl: 'https://content1.rozetka.com.ua/goods/images/big/14201044.jpg' },
  { name: 'Pasta', price: 1.3, unit: 'pack', imageUrl: 'https://i.guim.co.uk/img/media/c0239c46d1f79016cb7b26508883fe9438c03985/433_1969_3975_3179/master/3975.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=f52e92ecc43c0cf88bca72062374ef10' },
  { name: 'Butter', price: 2.8, unit: 'block', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTX1l0mNZQP2BQNCzfX6-0xhYAz6hPWeDaXbg&s' },
  { name: 'Yogurt', price: 1.0, unit: 'cup', imageUrl: 'https://ever.ph/cdn/shop/files/100000079110-Nestle-Yogurt-Greek-Plain-110g-240430_376eb455-48bc-40d1-8af7-0bc9b5d44b70.jpg?v=1756439834' },
  { name: 'Coffee', price: 6.0, unit: 'pack', imageUrl: 'https://tushkan.com.ua/wp-content/uploads/2024/07/kofe-bej.jpg' },
  { name: 'Tea', price: 4.0, unit: 'box', imageUrl: 'https://content1.rozetka.com.ua/goods/images/big/353275699.jpg' },
  { name: 'Juice', price: 20.2, unit: 'liter', imageUrl: 'https://greenvalley.pk/cdn/shop/files/mix-fruit-juice-500-ml_9f3f508c-9e09-47a1-a8c4-b0272e46e7f6.webp?v=1739451240' },
  { name: 'Classic T-Shirt', price: 15.0, unit: 'piece', imageUrl: 'https://oldguysrule.co.uk/cdn/shop/files/original-classic-t-shirt-navy-165_1600x.jpg?v=1695740020' },
  { name: 'Jeans', price: 40.0, unit: 'piece', imageUrl: 'https://www.gerberchildrenswear.com/cdn/shop/files/Gerber_1-pack-baby-neutral-blue-straight-fit-jeans-evyr-d_image_1.jpg?v=1721762942&width=1920' },
  { name: 'Sneakers', price: 60.0, unit: 'pair', imageUrl: 'https://static.nike.com/a/images/t_default/fb18a763-36ce-4b6a-8028-56f4d3b4f7ec/air-force-1-07-shoes-WrLlWX.png' },
  { name: 'Jacket', price: 75.0, unit: 'piece', imageUrl: 'https://www.pngarts.com/files/3/Men-Jacket-PNG-Image-Background.png' },
  { name: 'Smartphone', price: 6099.0, unit: 'piece', imageUrl: 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-14-pro-model-unselect-gallery-2-202209?wid=5120&hei=2880&fmt=jpeg&qlt=90&.v=1661959177560' },
  { name: 'Laptop', price: 10200.0, unit: 'piece', imageUrl: 'https://m.media-amazon.com/images/I/510uTHyDqGL.jpg' },
  { name: 'Wireless Headphones', price: 150.0, unit: 'piece', imageUrl: 'https://cdn.mos.cms.futurecdn.net/H45dC94VsuD7CMszsoJro3.png' },
  { name: 'Smartwatch', price: 199.0, unit: 'piece', imageUrl: 'https://media.gelius.ua/images/832efced-ee0d-11ef-82e3-ac162d75ecbb_thumbnail.jpg' },
];

async function seed() {
  try {
    await connectDB();

    await Product.deleteMany();
    console.log('Old products removed');

    await Product.insertMany(sampleProducts);
    console.log('Sample products added');

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
