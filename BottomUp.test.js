//Ejemplo de la primera parte del test Bottom-Up evolutivo
//Hacemos los require conforme tenemos las pruebas, en este caso ya podemos probar
//completamente UserService pero faltan las pruebas unitarias de InventoryService
const UserService = require('./UserService');
const InventoryService = require('./InventoryService');

test('Bottom-Up: nivel inicial', () => {
  //Hacemos el test como si ya tuviéramos las pruebas unitarias de InventoryService 
  //(las de UserService ya están creadas)
  const user = new UserService();
  const inventory = new InventoryService();

  //Aquí ya podemos hacer uso de validateUser
  const userResult = user.validateUser(1);
  //En caso de tener las pruebas de InventoryService, ya podemos probar checkStock
  const stock = inventory.checkStock(1, 2);

  //Vemos resultados para analizar el comportamiento paso por paso
  console.log(userResult);
  console.log(stock);

  //Aquí validamos que ambos módulos funcionan correctamente
  expect(userResult.valid).toBe(true);
  expect(stock).toBe(true);
});

//Después de probar esto, continuamos haciendo pruebas unitarias para los distintos módulos y comenzamos las de integración