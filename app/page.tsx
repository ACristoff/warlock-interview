import { Button } from "@/components/ui/button";








export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Button variant="outline" >Testable</Button>
    </div>
  );
}

const cableData = [
  {
    "COLBI_ID": "COLBI_ID_0007681",
    "ID": "17254",
    "STOCK_NUM": "105460",
    "SPEC_NAME": "AL 600V XLPE Insulation Single Type USE-2",
    "OVERALL_DIAMETER": 0.512, //inches
    "CONDUCTOR_NUMBER": 3
  },
  {
    "COLBI_ID": "COLBI_ID_0001988",
    "ID": "47101",
    "STOCK_NUM": "138929",
    "SPEC_NAME": "CU 1000V XLPE Insulation Teck 90 LSZH Jacket",
    "OVERALL_DIAMETER": 0.899,
    "CONDUCTOR_NUMBER": 2
  },
  {
    "COLBI_ID": "COLBI_ID_0005592",
    "ID": "4110",
    "STOCK_NUM": "646907",
    "SPEC_NAME": "CU 15kV NLEPR Insulation 133% IL AIA Red CPE-TP Jacket.  Tray Rated - Sunlight Resistant - For Direct Burial",
    "OVERALL_DIAMETER": 3.443,
    "CONDUCTOR_NUMBER": 1
  },
]

const Conduits = [
  {
    "INNER_CONDUIT_DIAMETER": 2.047
  },
  {
    "INNER_CONDUIT_DIAMETER": 6.031
  }
]


