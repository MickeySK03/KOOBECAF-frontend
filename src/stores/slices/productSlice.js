import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";

export const fetchAllProduct = createAsyncThunk("products/fetchAllProducts", async (payload, thunkAPI) => {
    try {
        const res = await axios.get("/product/allProduct");
        return res.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

export const fetchProductById = createAsyncThunk("products/fetchProductById", async (productId, thunkAPI) => {
    try {
        const res = await axios.get(`/product/${productId}`);
        return res.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

export const fetchProductByUserId = createAsyncThunk("product/fetchProductByUserId", async (userId, thunkAPI) => {
    try {
        const res = await axios.get(`/product/search/${userId}`);
        return res.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

export const fetchWishlist = createAsyncThunk("product/fetchWishlist", async (payload, thunkAPI) => {
    try {
        const res = await axios.get("/product/wishlist");
        return res.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

export const createProduct = createAsyncThunk("products/createProducts", async ({ formData }, thunkAPI) => {
    try {
        const res = await axios.post("/product/create", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return res.data;
    } catch (error) {
        toast.error("You can add only 5 photos.");
        return thunkAPI.rejectWithValue(error.message);
    }
});

export const updateProductStatus = createAsyncThunk("products/updateProductStatus", async (payload, thunkAPI) => {
    try {
        const body = {
            status: payload.fieldValue,
        };
        const res = await axios.put(`/product/${payload.productId}`, body);
        return res.data;
    } catch (error) {
        toast.error("You can add only 5 photos.");
        return thunkAPI.rejectWithValue(error.message);
    }
});
export const updateProduct = createAsyncThunk("products/updateProducts", async ({ productId, formData }, thunkAPI) => {
    try {
        const res = await axios.patch(`/product/edit/${productId}`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return res.data;
    } catch (error) {
        toast.error("You can add only 5 photos.");
        return thunkAPI.rejectWithValue(error.message);
    }
});

export const deleteProduct = createAsyncThunk("/product/deleteProduct", async (productId, thunkAPI) => {
    try {
        const res = await axios.delete(`/product/${productId}`);
        return res.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

export const fetchProductByCategory = createAsyncThunk(
    "products/fetchProductByCategorys",
    async (categoryId, thunkAPI) => {
        try {
            const res = await axios.get(`/product/category/${categoryId}`);
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    },
);

export const fetchProductByProductId = createAsyncThunk(
    "products/fetchProductByProductId",
    async (productId, thunkAPI) => {
        try {
            const res = await axios.get(`/product/${productId}`);
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    },
);

export const wishListProduct = createAsyncThunk("products/wishListProduct", async (productId, thunkAPI) => {
    try {
        const res = await axios.post(`/product/wishList/${productId}`);
        return res.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

export const fetchGeocoding = createAsyncThunk("products/fetchGeocodings", async (address) => {
    try {
        const newAxios = axios.create({});
        const res = await newAxios.get("/json", {
            params: { address, key: "AIzaSyAD2cnxbl_ndhGSO6emJt0oSrs_Y3aRO3Q" },
            baseURL: "https://maps.googleapis.com/maps/api/geocode",
        });
        return res.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

const inputProduct = {
    productName: "",
    productPrice: "",
    productImage: [],
    description: " ",
    latitude: 11.11,
    longitude: 11.11,
    vehicleType: "",
    vehicleBrand: "",
    vehicleModel: "",
    vehicleYears: "",
    homeProperty: "",
    homeType: "",
    bedroomQuantity: "",
    bathroomQuantity: "",
    homeAddress: "",
    idsToDelete: [],
    categoryId: 0,
    typeOfCategory: "",
};

const searchProduct = "";
const searchProductProfile = "";

const productPrice = {
    minPrice: "",
    maxPrice: "",
};

function calculateDistance(lat1, lon1, lat2, lon2) {
    const earthRadius = 6371;

    lat1 = toRadians(lat1);
    lon1 = toRadians(lon1);
    lat2 = toRadians(lat2);
    lon2 = toRadians(lon2);

    const dLat = lat2 - lat1;
    const dLon = lon2 - lon1;

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = earthRadius * c;

    return distance;
}

function toRadians(degrees) {
    return degrees * (Math.PI / 180);
}

const productSlice = createSlice({
    name: "product",
    initialState: {
        inputLocation: [],
        inputSubLocation: "",
        inputProduct,
        searchProduct,
        searchProductProfile,
        productPrice,
        productData: null,
        productByUserId: null,
        productByCategory: null,
        productByProductId: null,
        isWishList: false,
        myWishListProduct: null,
        deleteProduct: null,
        wishlistProduct: null,
        loading: false,
        error: "",
        success: false,
        errorMessage: false,
    },
    reducers: {
        filterByLocation: (state, { payload }) => {
            state.productData = state.productData.filter(
                (x) => calculateDistance(payload.latitude, payload.longitude, x.latitude, x.longitude) < 5,
            );
        },
        setInputSubLocation: (state, { payload }) => {
            state.inputSubLocation = payload;
        },
        setInputLocation: (state, { payload }) => {
            state.inputLocation = payload.fieldLocation;
        },
        logoutProduct: (state, { payload }) => {
            state.productData = null;
        },
        setInputProduct: (state, { payload }) => {
            state.inputProduct[payload.fieldName] = payload.fieldValue;

            Array.from(state.inputProduct?.productImage || 0).length +
                Array.from(state.inputProduct?.image || 0).length >
            5
                ? (state.errorMessage = true)
                : (state.errorMessage = false);
        },
        updateInputProduct: (state, { payload }) => {
            state.inputProduct = { ...state.inputProduct, ...payload };
        },
        setInputProductCategory: (state, { payload }) => {
            state.inputProduct.categoryId = payload.id;
            state.inputProduct.typeOfCategory = payload.fieldValue;
        },
        resetInputProduct: (state, { payload }) => {
            state.inputProduct = inputProduct;
            state.errorMessage = false;
        },
        setSearchProduct: (state, { payload }) => {
            state.searchProduct = payload.fieldValue;
        },
        resetSearchProduct: (state, { payload }) => {
            state.searchProduct = "";
        },
        setSearchProductProfile: (state, { payload }) => {
            state.searchProductProfile = payload.fieldValue;
        },
        resetSearchProductProfile: (state, { payload }) => {
            state.searchProductProfile = "";
        },
        setProductPrice: (state, { payload }) => {
            state.productPrice[payload.fieldName] = payload.fieldValue;
        },
        resetProductPrice: (state, { payload }) => {
            state.productPrice = productPrice;
        },
        resetLocation: () => {
            state.inputLocation = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllProduct.pending, (state, { payload }) => {
                state.loading = true;
                state.skeleton = true;
                state.error = "";
            })
            .addCase(fetchAllProduct.fulfilled, (state, { payload }) => {
                state.productData = payload.allProduct;
                state.loading = false;
                state.success = true;
            })
            .addCase(fetchAllProduct.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            });

        builder
            .addCase(fetchProductById.pending, (state, { payload }) => {
                state.loading = true;
                state.error = "";
            })
            .addCase(fetchProductById.fulfilled, (state, { payload }) => {
                state.productData = payload.product;
                state.loading = false;
                state.success = true;
            })
            .addCase(fetchProductById.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            });

        builder
            .addCase(fetchProductByUserId.pending, (state, { payload }) => {
                state.loading = true;
                state.error = "";
            })
            .addCase(fetchProductByUserId.fulfilled, (state, { payload }) => {
                state.productByUserId = payload.product;
                state.loading = false;
                state.success = true;
            })
            .addCase(fetchProductByUserId.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            });

        builder
            .addCase(fetchWishlist.pending, (state, { payload }) => {
                state.loading = true;
                state.error = "";
            })
            .addCase(fetchWishlist.fulfilled, (state, { payload }) => {
                state.wishlistProduct = payload.wishlistProduct;
                state.loading = false;
                state.success = true;
            })
            .addCase(fetchWishlist.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            });

        builder
            .addCase(createProduct.pending, (state, { payload }) => {
                state.loading = true;
                state.error = "";
            })
            .addCase(createProduct.fulfilled, (state, { payload }) => {
                state.productByUserId = payload.product;
                state.loading = false;
                state.success = true;
            })
            .addCase(createProduct.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            });

        builder
            .addCase(updateProduct.pending, (state, { payload }) => {
                state.loading = true;
                state.error = "";
            })
            .addCase(updateProduct.fulfilled, (state, { payload }) => {
                state.productByUserId = payload.product;
                state.loading = false;
                state.success = true;
            })
            .addCase(updateProduct.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            });

        builder
            .addCase(deleteProduct.pending, (state, { payload }) => {
                state.loading = true;
                state.error = "";
            })
            .addCase(deleteProduct.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(deleteProduct.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            });

        builder
            .addCase(fetchProductByCategory.pending, (state, { payload }) => {
                state.loading = true;
                state.error = "";
            })
            .addCase(fetchProductByCategory.fulfilled, (state, { payload }) => {
                state.productByCategory = payload.product;
                state.loading = false;
                state.success = true;
            })
            .addCase(fetchProductByCategory.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            });

        builder
            .addCase(fetchProductByProductId.pending, (state, { payload }) => {
                state.loading = true;
                state.error = "";
            })
            .addCase(fetchProductByProductId.fulfilled, (state, { payload }) => {
                state.productByProductId = payload.product;
                state.isWishList = payload.isWishList;
                state.loading = false;
                state.success = true;
            })
            .addCase(fetchProductByProductId.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            });

        builder
            .addCase(wishListProduct.pending, (state, { payload }) => {
                state.loading = true;
                state.error = "";
            })
            .addCase(wishListProduct.fulfilled, (state, { payload }) => {
                state.myWishListProduct = payload.product;
                state.loading = false;
                state.success = true;
            })
            .addCase(wishListProduct.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            });

        builder
            .addCase(fetchGeocoding.pending, (state, { payload }) => {
                state.loading = true;
                state.error = "";
            })
            .addCase(fetchGeocoding.fulfilled, (state, { payload }) => {
                const payloadData = payload.results;
                state.inputLocation = payloadData;
                if (payloadData.length != 0) {
                    const location = payloadData[0].geometry.location;
                    state.inputProduct.latitude = location.lat;
                    state.inputProduct.longitude = location.lng;
                }
                state.loading = false;
                state.success = true;
            })
            .addCase(fetchGeocoding.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            });

        builder
            .addCase(updateProductStatus.pending, (state, { payload }) => {
                state.loading = true;
                state.error = "";
            })
            .addCase(updateProductStatus.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(updateProductStatus.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            });
    },
});

export const {
    inputLocation: logoutProduct,
    setInputProduct,
    setInputProductCategory,
    setInputProductImage,
    resetInputProduct,
    setSearchProduct,
    resetSearchProduct,
    setProductPrice,
    resetProductPrice,
    updateInputProduct,
    setSearchProductProfile,
    resetSearchProductProfile,
    setInputSubLocation,
    setInputLocation,
    resetLocation,
    filterByLocation,
} = productSlice.actions;

export default productSlice.reducer;
