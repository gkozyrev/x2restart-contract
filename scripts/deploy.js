
async function main() {
  const X2Restart = await ethers.getContractFactory("X2Restart");
  const x2Restart = await X2Restart.deploy();

  console.log("X2Restart deployed to:", x2Restart.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });