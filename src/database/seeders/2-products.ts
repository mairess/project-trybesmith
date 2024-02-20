import { QueryInterface } from 'sequelize';

export default {
  async up(queryInterface: QueryInterface) {
    return await queryInterface.bulkInsert('products', [
      {
        name: 'Excalibur',
        price: '10 peças de ouro',
        user_id: 1
      },
      {
        name: 'Espada Justiceira',
        price: '20 peças de ouro',
        user_id: 1
      },
      {
        name: 'Lira de Orfeu',
        price: '1 peça de ouro',
        user_id: 2
      },
      {
        name: 'Armadura de Aquiles',
        price: '1 peça de ouro',
        user_id: 2
      },
      {
        name: 'Harpa de Dagda',
        price: '15 peças de ouro',
        user_id: 3
      },
    ], {});
  },
  
  async down(queryInterface: QueryInterface) {
    return await queryInterface.bulkDelete('products', {});
  }
};
