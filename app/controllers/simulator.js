import potentialSimulation from "../models/potentialSimulation.js";
import simulationResult from "../models/simulationResult.js";
import { httpError } from "../helpers/errorHandler.js";
import _ from "lodash";

const phiDistribution = (average, stdDev) => {
  return () => {
    return average + stdDev * _.random(-3, 3, true);
  };
};

const heightDistribution = (min, med, max) => {
  return () => {
    return _.random(min, max, false);
  };
};

/**
 * Function to estimate the static potential of water storage
 * @param {Request} req request
 * @param {Response} res response
 */
export const simulatePotential = async (req, res) => {
  const { phie_average, phie_desvest, h_min, h_med, h_max, area, iterations } =
    req.body;

  try {
    const getPhieSample = phiDistribution(phie_average, phie_desvest);

    const getHeightSample = heightDistribution(h_min, h_med, h_max);

    const potentials = [];
    for (let i = 0; i < iterations; i++) {
      const phie = getPhieSample();
      const h = getHeightSample();
      const potential = phie * h * area * 0.3048;
      potentials.push(potential);
    }

    const sortedPotentials = potentials.sort((a, b) => a - b);
    const p10 = sortedPotentials[Math.round(iterations * 0.1)];
    const p50 = sortedPotentials[Math.round(iterations * 0.5)];
    const p90 = sortedPotentials[Math.round(iterations * 0.9)];

    const result = await potentialSimulation.create({
      phie_average,
      phie_desvest,
      h_min,
      h_med,
      h_max,
      area,
      iterations,
    });

    // Create a new simulation record
    const newSimulation = await simulationResult.create({
      type: "Static potential",
      p10,
      p50,
      p90,
      iterations,
      units: "Mm3", // Replace with appropriate units
    });

    res.status(200).json(newSimulation);
  } catch (err) {
    httpError(res, err, "Something went wrong", 500);
  }
};
