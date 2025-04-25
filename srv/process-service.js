const cds = require("@sap/cds");

module.exports = async function () {
  const { Processes } = cds.entities("my");

  this.on("createDeepProcess", async (req) => {
    const newProcess = {
      process: "Order Fulfillment",
      description: "Handles order to delivery",
      state: "DRAFT",
      activities: [
        { description: "Validate Order", state: "ACTIVE" },
        { description: "Ship Order", state: "INACTIVE" },
      ],
      links: [
        {
          sequence: 1,
          fromActivity: {
            ID: "11111111-1111-1111-1111-111111111111",
            description: "test",
          }, // Assuming these IDs exist
          toActivity: {
            ID: "22222222-2222-2222-2222-222222222222",
            description: "test",
          },
        },
      ],
    };

    try {
      const processService = await cds.connect.to("ProcessService");
      await processService.run(
        INSERT.into("ProcessService.Processes").entries(newProcess)
      );
      return "ok";
    } catch (err) {
      console.error("Error creating deep process:", err.message);
      req.error(500, "Deep insert failed");
      return "NOK";
    }
  });
};
