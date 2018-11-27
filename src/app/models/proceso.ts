export class Proceso{
	constructor(
	public id: string,
	public etapa1: boolean,
        public etapa2: boolean,
        public etapa3: boolean,
        public etapa4: boolean,
        public etapa5: boolean,
        public etapa6: boolean,
        public etapa7: boolean,
        public etapa8: boolean,
				public bonustresmeses: boolean,
				public bonusseismeses: boolean,
        public idrecomendados: string
   ){}
}
