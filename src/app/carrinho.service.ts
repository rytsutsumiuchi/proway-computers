import { Injectable } from '@angular/core';
import { IProdutoCarrinho } from './produtos';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {
  itens: IProdutoCarrinho[] = [];
  
  constructor() { }

  obtemCarrinho() {
    this.itens = JSON.parse((localStorage.getItem("carrinho")) || "[]");
    return this.itens;
  }

  adicionarAoCarrinho(produto: IProdutoCarrinho) {
    const itemIndex = this.itens.findIndex(p => p.id === produto.id);
    if(itemIndex === -1) {
      this.itens.push(produto);
    } else {
      this.itens[itemIndex].quantidade += produto.quantidade;
    }
    localStorage.setItem("carrinho", JSON.stringify(this.itens));
  }

  removerProdutoCarrinho(produtoId: number) {
    this.itens = this.itens.filter(item => item.id !== produtoId);
    localStorage.setItem("carrinho", JSON.stringify(this.itens));
  }

  limparCarrinho() {
    this.itens = [];
    localStorage.clear();
  }
}
