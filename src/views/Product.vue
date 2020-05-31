<template>
  <div class="product h-100">
    <div class="container h-100">
      <div class="row h-100 align-items-center">
        <div class="col-md-6">
          <h1>This is Product</h1>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusamus
            saepe hic adipisci pariatur debitis repellendus quasi in labore ut
            cumque numquam molestiae atque tenetur exercitationem facilis rerum,
            expedita eos beatae.
          </p>
        </div>
        <div class="col-md-6">
          <img src="/img/svg/product.svg" alt="" class="img-fluid" />
        </div>
      </div>
    </div>
    <div class="container">
      <form class="text-left">
        <div class="">
          <div class="form-group">
            <label for="product">Product Name</label>
            <input type="text" v-model="product.name" class="form-control" aria-describedby="" />
          </div>
          <div class="form-group">
            <label for="password">Price</label>
            <input @keyup.enter.prevent="saveData" v-model="product.price" type="text" class="form-control" />
          </div>
        </div>
        <button type="submit" @click.prevent="saveProduct" class="btn btn-primary">Save</button>
      </form>
    </div>

    <div class="container table-responsive py-5">
      <table class="table">
        <thead>
          <tr>
            <th>name</th>
            <th>price</th>
            <th>Modify</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id">
            <td>{{product.data().name}}</td>
            <td>{{product.data().price}}</td>
            <td>
              <button @click="editProduct(product)" class="btn btn-primary">Edit</button>
              <button @click="deleteProduct(product.id)" class="btn btn-danger">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="editProduct" tabindex="-1" role="dialog" aria-labelledby="editProductTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Edit Product</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form class="text-left">
              <div class="">
                <div class="form-group">
                  <label for="product">Product Name</label>
                  <input type="text" v-model="product.name" class="form-control" aria-describedby="" />
                </div>
                <div class="form-group">
                  <label for="password">Price</label>
                  <input v-model="product.price" type="text" class="form-control" />
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button @click="updateProduct" type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { db } from "../firebase";
export default {
  name: "Overview",
  data() {
    return {
      products: [],
      product: {
        name: null,
        price: null
      },
      activeProduct: null
    };
  },
  methods: {
    watcher() {
      db.collection("products").onSnapshot((querySnapshot) => {
          this.products = [];
          querySnapshot.forEach((doc) => {
            this.products.push(doc);
          });
          // console.log("Current cities in CA: ", cities.join(", "));
        });
    },
    updateProduct() {
      db.collection("products")
        .doc(this.activeProduct)
        .update(this.product)
        .then(() => {
          $("#editProduct").modal("hide");
          this.watcher();
          console.log("Document successfully updated!");
        })
        .catch(function(error) {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
        });
    },
    editProduct(product) {
      $("#editProduct").modal("show");
      this.product = product.data();
      this.activeProduct = product.id;
    },
    deleteProduct(doc) {
      if (confirm("Are you sure?")) {
        db.collection("products")
          .doc(doc)
          .delete()
          .then(function() {
            console.log("Document successfully deleted!");
          })
          .catch(function(error) {
            console.error("Error removing document: ", error);
          });
      }
    },
    readData() {
      db.collection("products")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            this.products.push(doc);
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
          });
        });
    },
    saveProduct() {
      db.collection("products")
        .add(this.product)
        .then(docRef => {
          this.watcher();
          console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
    },
    resetData() {
      Object.assign(this.$data, this.$options.data());
    }
  },
  created() {
    this.readData();
  }
};
</script>
