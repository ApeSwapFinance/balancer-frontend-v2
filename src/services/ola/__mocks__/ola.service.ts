export default function OlaService() {
  return {
    calcWeightedSupplyAPRFor: jest.fn().mockImplementation()
  };
}

export const olaService = OlaService();
