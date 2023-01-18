class Car {
  brand: string;
  color: string;
  doors: number;

  constructor(brand: string, color: string, doors: number) {
    this.brand = brand;
    this.color = color;
    this.doors = doors;
  }

  honk(): void {
    console.log("Aciona Buzina");
  };

  turnOn(): void {
    console.log("Liga o Carro");
  };

  turnOff(): void {
    console.log("Desliga o Carro");
  };

  speedUp(): void {
    console.log("Acelera");
  };

  speedDown(): void {
    console.log("Desacelera");
  };

  stop(): void {
    console.log("Para o Carro");
  };

  turn(side: "left"| "right"): void {
    console.log(`Turn ${side}`);
  };
}

export default Car;