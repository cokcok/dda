export interface data {
    maxpadding: null,
    limit: null,
    data_detail: data_detail[];
}

export interface data_detail{

}

export interface number_data{
    numberhead: numberhead[],
}

export interface numberhead {
    id: null,
    color: null,
    front_number: numberdata_detail[];
    back_number: numberdata_detail[];
}

export interface numberdata_detail{
    numberid:null,
    number:null,
    mtd_size_id:null,
    size_name:null,
    qty:null,
    price:null,
}
