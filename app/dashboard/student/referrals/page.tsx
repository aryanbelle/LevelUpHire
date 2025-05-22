"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ShareIcon } from "@/components/icons";
import { toast } from "@/hooks/use-toast";

export default function ReferralsPage() {
  const [copied, setCopied] = useState(false);
  const referralLink = "https://leveluphire.com/ref/john123";
  
  // Mock referral data
  const pendingReferrals = [
    {
      id: "1",
      email: "friend1@example.com",
      date: "2 days ago",
      status: "pending",
    },
    {
      id: "2",
      email: "friend2@example.com",
      date: "5 days ago",
      status: "pending",
    },
  ];
  
  const completedReferrals = [
    {
      id: "3",
      name: "Jane Smith",
      email: "jane@example.com",
      date: "1 month ago",
      points: 200,
      status: "completed",
    },
    {
      id: "4",
      name: "Michael Johnson",
      email: "michael@example.com",
      date: "2 months ago",
      points: 200,
      status: "completed",
    },
  ];
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    
    toast({
      title: "Referral link copied!",
      description: "The link has been copied to your clipboard.",
    });
    
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <div className="space-y-8 animate-in">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Referrals</h2>
        <p className="text-muted-foreground">
          Invite friends and earn points when they join LevelUpHire.
        </p>
      </div>
      
      {/* Referral Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Referrals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{pendingReferrals.length + completedReferrals.length}</div>
            <p className="text-sm text-muted-foreground">
              From {pendingReferrals.length} sent invites
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Successful Referrals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{completedReferrals.length}</div>
            <p className="text-sm text-muted-foreground">
              {((completedReferrals.length / (pendingReferrals.length + completedReferrals.length)) * 100).toFixed(0)}% conversion rate
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Points Earned</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{completedReferrals.reduce((sum, ref) => sum + ref.points, 0)}</div>
            <p className="text-sm text-muted-foreground">
              200 points per successful referral
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* Referral Link */}
      <Card className="border-2 border-primary/20">
        <CardHeader>
          <CardTitle>Your Referral Link</CardTitle>
          <CardDescription>
            Share this link with friends and earn 200 points for each successful sign-up.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              value={referralLink}
              readOnly
              className="font-mono text-sm bg-muted/50"
            />
            <Button onClick={copyToClipboard} className={`${copied ? "bg-green-600 hover:bg-green-700" : ""}`}>
              {copied ? (
                <>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-4 w-4 mr-1" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-4 w-4 mr-1" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                  </svg>
                  Copy
                </>
              )}
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-3">
          <Button variant="outline" className="w-full sm:w-auto">
            <svg 
              className="h-4 w-4 mr-1" 
              fill="currentColor" 
              viewBox="0 0 24 24" 
              aria-hidden="true"
            >
              <path 
                fillRule="evenodd" 
                d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" 
                clipRule="evenodd" 
              />
            </svg>
            Instagram
          </Button>
          <Button variant="outline" className="w-full sm:w-auto">
            <svg 
              className="h-4 w-4 mr-1" 
              fill="currentColor" 
              viewBox="0 0 24 24" 
              aria-hidden="true"
            >
              <path 
                d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" 
              />
            </svg>
            Twitter
          </Button>
          <Button variant="outline" className="w-full sm:w-auto">
            <svg 
              className="h-4 w-4 mr-1" 
              fill="currentColor" 
              viewBox="0 0 24 24" 
              aria-hidden="true"
            >
              <path 
                fillRule="evenodd" 
                d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" 
                clipRule="evenodd" 
              />
            </svg>
            Facebook
          </Button>
          <Button className="w-full sm:w-auto">
            <ShareIcon className="h-4 w-4 mr-1" />
            Share Link
          </Button>
        </CardFooter>
      </Card>
      
      {/* Email Invitation */}
      <Card>
        <CardHeader>
          <CardTitle>Invite Friends via Email</CardTitle>
          <CardDescription>
            Send a direct invitation to your friends' email addresses.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              placeholder="friend@example.com"
              type="email"
            />
            <Button>
              Send Invite
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Referral History */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Referral History</h3>
        <Tabs defaultValue="pending">
          <TabsList className="mb-4">
            <TabsTrigger value="pending">Pending ({pendingReferrals.length})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({completedReferrals.length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="pending" className="mt-0">
            {pendingReferrals.length > 0 ? (
              <Card>
                <CardContent className="p-0">
                  <div className="rounded-md overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-muted/50">
                          <th className="text-left py-3 px-4">Email</th>
                          <th className="text-left py-3 px-4">Date Sent</th>
                          <th className="text-right py-3 px-4">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pendingReferrals.map((referral) => (
                          <tr key={referral.id} className="border-b last:border-b-0">
                            <td className="py-4 px-4">
                              {referral.email}
                            </td>
                            <td className="py-4 px-4">
                              {referral.date}
                            </td>
                            <td className="py-4 px-4 text-right">
                              <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                                Pending
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-muted mb-4">
                    <ShareIcon className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">No pending referrals</h3>
                  <p className="text-muted-foreground mb-4">
                    You haven't sent any referral invitations yet.
                  </p>
                  <Button>Invite Friends</Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="completed" className="mt-0">
            {completedReferrals.length > 0 ? (
              <Card>
                <CardContent className="p-0">
                  <div className="rounded-md overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-muted/50">
                          <th className="text-left py-3 px-4">Name</th>
                          <th className="text-left py-3 px-4">Email</th>
                          <th className="text-left py-3 px-4">Date Joined</th>
                          <th className="text-right py-3 px-4">Points Earned</th>
                        </tr>
                      </thead>
                      <tbody>
                        {completedReferrals.map((referral) => (
                          <tr key={referral.id} className="border-b last:border-b-0">
                            <td className="py-4 px-4 font-medium">
                              {referral.name}
                            </td>
                            <td className="py-4 px-4">
                              {referral.email}
                            </td>
                            <td className="py-4 px-4">
                              {referral.date}
                            </td>
                            <td className="py-4 px-4 text-right">
                              <Badge className="bg-green-50 text-green-700 border-green-200">
                                +{referral.points} points
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-muted mb-4">
                    <ShareIcon className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">No successful referrals yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Once your friends sign up using your referral link, they'll appear here.
                  </p>
                  <Button>Share Your Link</Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}