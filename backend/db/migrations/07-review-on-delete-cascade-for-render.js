module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint(
      "ReviewImages",
      "ReviewImages_reviewId_fkey"
    );
    await queryInterface.addConstraint("ReviewImages", {
      fields: ["reviewId"],
      type: "foreign key",
      name: "ReviewImages_reviewId_fkey",
      references: {
        table: "Reviews",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint(
      "ReviewImages",
      "ReviewImages_reviewId_fkey"
    );
    await queryInterface.addConstraint("ReviewImages", {
      fields: ["reviewId"],
      type: "foreign key",
      name: "ReviewImages_reviewId_fkey",
      references: {
        table: "Reviews",
        field: "id",
      },
    });
  },
};
