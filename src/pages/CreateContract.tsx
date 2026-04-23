import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Plus, Trash2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AppLayout } from "@/components/AppLayout";
import { toast } from "sonner";

interface MilestoneForm {
  title: string;
  amount: string;
  deadline: string;
}

export default function CreateContractPage() {
  const [step, setStep] = useState(0);
  const [client, setClient] = useState("0x7890...1234");
  const [freelancer, setFreelancer] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [milestones, setMilestones] = useState<MilestoneForm[]>([
    { title: "", amount: "", deadline: "" },
  ]);
  const [autoRelease, setAutoRelease] = useState("72");

  const addMilestone = () => setMilestones([...milestones, { title: "", amount: "", deadline: "" }]);
  const removeMilestone = (i: number) => setMilestones(milestones.filter((_, idx) => idx !== i));
  const updateMilestone = (i: number, field: keyof MilestoneForm, value: string) => {
    const updated = [...milestones];
    updated[i] = { ...updated[i], [field]: value };
    setMilestones(updated);
  };

  const totalMilestoneAmount = milestones.reduce((sum, m) => sum + (parseFloat(m.amount) || 0), 0);

  const handleSubmit = () => {
    toast.success("Contract created", {
      description: "Transaction pending confirmation...",
    });
  };

  const steps = ["PARTIES", "MILESTONES", "REVIEW"];

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <div className="label-caps mb-1">NEW</div>
          <h1 className="font-display text-2xl font-bold">CREATE CONTRACT</h1>
        </div>

        {/* Stepper */}
        <div className="flex items-center">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center flex-1">
              <div className={`flex items-center gap-2 ${i <= step ? "text-foreground" : "text-muted-foreground"}`}>
                <div className={`h-6 w-6 flex items-center justify-center font-mono text-xs font-bold ${
                  i < step ? "bg-primary text-primary-foreground" : i === step ? "border border-primary text-primary" : "border border-border text-muted-foreground"
                }`}>
                  {i < step ? <Check className="h-3 w-3" /> : i + 1}
                </div>
                <span className="font-mono text-[10px] tracking-wider hidden sm:block">{s}</span>
              </div>
              {i < steps.length - 1 && <div className={`flex-1 h-px mx-3 ${i < step ? "bg-primary" : "bg-border"}`} />}
            </div>
          ))}
        </div>

        {/* Steps */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -15 }}
            className="border border-border p-6 space-y-5"
          >
            {step === 0 && (
              <>
                <div className="space-y-2">
                  <Label className="label-caps">CLIENT ADDRESS</Label>
                  <Input value={client} onChange={(e) => setClient(e.target.value)} placeholder="0x..." className="font-mono text-sm bg-secondary border-border" />
                  <p className="text-[10px] text-muted-foreground font-mono">// auto-filled from wallet</p>
                </div>
                <div className="space-y-2">
                  <Label className="label-caps">FREELANCER ADDRESS</Label>
                  <Input value={freelancer} onChange={(e) => setFreelancer(e.target.value)} placeholder="0x..." className="font-mono text-sm bg-secondary border-border" />
                </div>
              </>
            )}

            {step === 1 && (
              <>
                <div className="space-y-2">
                  <Label className="label-caps">TOTAL AMOUNT (ETH)</Label>
                  <Input value={totalAmount} onChange={(e) => setTotalAmount(e.target.value)} placeholder="0.00" type="number" className="font-mono bg-secondary border-border" />
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="label-caps">MILESTONES</span>
                    <Button variant="ghost" size="sm" onClick={addMilestone} className="gap-1 text-primary font-mono text-xs uppercase">
                      <Plus className="h-3 w-3" /> Add
                    </Button>
                  </div>
                  {milestones.map((m, i) => (
                    <div key={i} className="p-4 border border-border bg-secondary/30 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs text-muted-foreground">#{String(i + 1).padStart(2, '0')}</span>
                        {milestones.length > 1 && (
                          <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive" onClick={() => removeMilestone(i)}>
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                      <Input placeholder="Title" value={m.title} onChange={(e) => updateMilestone(i, "title", e.target.value)} className="bg-secondary border-border text-sm" />
                      <div className="grid grid-cols-2 gap-3">
                        <Input placeholder="Amount (ETH)" type="number" value={m.amount} onChange={(e) => updateMilestone(i, "amount", e.target.value)} className="bg-secondary border-border font-mono text-sm" />
                        <Input type="date" value={m.deadline} onChange={(e) => updateMilestone(i, "deadline", e.target.value)} className="bg-secondary border-border text-sm" />
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="label-caps">AUTO-RELEASE TIMER (HOURS)</Label>
                  <Input value={autoRelease} onChange={(e) => setAutoRelease(e.target.value)} type="number" className="font-mono bg-secondary border-border" />
                </div>
                <div className="border border-border p-4 space-y-3">
                  <span className="label-caps">SUMMARY</span>
                  <div className="space-y-2 text-sm font-mono">
                    <div className="flex justify-between py-1">
                      <span className="text-muted-foreground">client</span>
                      <span>{client}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-muted-foreground">freelancer</span>
                      <span>{freelancer || "—"}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-muted-foreground">total</span>
                      <span className="text-primary font-bold">{totalMilestoneAmount.toFixed(2)} ETH</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-muted-foreground">milestones</span>
                      <span>{milestones.length}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-muted-foreground">auto_release</span>
                      <span>{autoRelease}h</span>
                    </div>
                    <div className="flex justify-between py-1 border-t border-border mt-2 pt-2">
                      <span className="text-muted-foreground">est_gas</span>
                      <span>~0.003 ETH</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setStep(step - 1)} disabled={step === 0} className="gap-2 font-mono text-xs uppercase border-border">
            <ArrowLeft className="h-3 w-3" /> Back
          </Button>
          {step < 2 ? (
            <Button onClick={() => setStep(step + 1)} className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 font-mono text-xs uppercase">
              Next <ArrowRight className="h-3 w-3" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 font-mono text-xs uppercase hard-shadow">
              Deploy Contract <Check className="h-3 w-3" />
            </Button>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
