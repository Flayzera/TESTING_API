const ProductModel = require('../models/productModel');

const ProductController = {
  create: async (req, res) => {
    try {
      console.log('Tentando criar produto:', req.body);
      const { name, price, category, enabled, image } = req.body;
      
      if (!name || !price || !category || !image) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios." });
      }

      const product = await ProductModel.create({ name, price, category, enabled, image });
      console.log('Produto criado com sucesso:', product);
      res.status(201).json(product);
    } catch (error) {
      console.error('Erro ao criar produto:', error);
      res.status(500).json({ error: "Erro ao criar produto.", details: error.message });
    }
  },

  findAll: async (_, res) => {
    try {
      console.log('Buscando todos os produtos');
      const products = await ProductModel.findAll();
      console.log('Produtos encontrados:', products.length);
      res.json(products);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      res.status(500).json({ error: "Erro ao buscar produtos.", details: error.message });
    }
  },

  findById: async (req, res) => {
    try {
      console.log('Buscando produto por ID:', req.params.id);
      const product = await ProductModel.findById(req.params.id);
      if (!product) {
        console.log('Produto não encontrado');
        return res.status(404).json({ error: "Produto não encontrado." });
      }
      console.log('Produto encontrado:', product);
      res.json(product);
    } catch (error) {
      console.error('Erro ao buscar produto:', error);
      res.status(500).json({ error: "Erro ao buscar produto.", details: error.message });
    }
  },

  update: async (req, res) => {
    try {
      console.log('Tentando atualizar produto:', req.params.id, req.body);
      const { name, price, category, enabled, image } = req.body;
      
      if (!name || !price || !category || !image) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios." });
      }

      const product = await ProductModel.update(req.params.id, { name, price, category, enabled, image });
      console.log('Produto atualizado com sucesso:', product);
      res.json(product);
    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
      res.status(500).json({ error: "Erro ao atualizar produto.", details: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      console.log('Tentando deletar produto:', req.params.id);
      await ProductModel.delete(req.params.id);
      console.log('Produto deletado com sucesso');
      res.json({ message: "Produto deletado com sucesso." });
    } catch (error) {
      console.error('Erro ao deletar produto:', error);
      res.status(500).json({ error: "Erro ao deletar produto.", details: error.message });
    }
  }
};

module.exports = ProductController;