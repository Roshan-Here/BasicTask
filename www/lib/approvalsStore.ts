import fs from "fs";
import path from "path";

type ApprovalsMap = Record<string, boolean>;

const FILE_PATH = path.join(process.cwd(), "data", "approvals.json");

function readApprovals(): ApprovalsMap {
  try {
    const raw = fs.readFileSync(FILE_PATH, "utf-8");
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

function writeApprovals(map: ApprovalsMap) {
  fs.writeFileSync(FILE_PATH, JSON.stringify(map, null, 2), "utf-8");
}

export function getApprovals() {
  return readApprovals();
}

export function setApproval(reviewId: string, approved: boolean) {
  const approvals = readApprovals();
  approvals[reviewId] = approved;
  writeApprovals(approvals);
}
