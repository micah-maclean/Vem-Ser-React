export const cpfMask =  value => {
    return value.replace(/\D/g, '')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3}).(\d{3})(\d)/, '$1.$2.$3')
        .replace(/(\d{3}).(\d{3}).(\d{3})(\d)/, '$1.$2.$3-$4'); 
}

export const dataMask =  value => {
    return value.replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '$1/$2')
        .replace(/(\d{2})\/(\d{2})(\d)/, '$1/$2/$3'); 
}

export const transformData =  value => {
    return value.split('-').reverse().join('/'); 
}

export const cepMask = value => {
    return value.replace(/\D/g, '')
        .replace(/(\d{5})(\d)/, '$1-$2')
        .substr(0, 9);
}

export const telefoneMask = value =>{
    return value.replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{4})(\d)/, '$1-$2')
        .replace(/(\d{4})-(\d)(\d{4})/, '$1$2-$3');

}