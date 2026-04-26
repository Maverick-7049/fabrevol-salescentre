import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl, type InsertLead } from "@shared/routes";

export function useLeads() {
  return useQuery({
    queryKey: [api.leads.list.path],
    queryFn: async () => {
      const res = await fetch(api.leads.list.path);
      if (!res.ok) throw new Error("Failed to fetch leads");
      return api.leads.list.responses[200].parse(await res.json());
    },
  });
}

export function useCreateLead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (lead: InsertLead) => {
      const res = await fetch(api.leads.create.path, {
        method: api.leads.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      });
      
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to create lead");
      }
      
      return api.leads.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.leads.list.path] });
    },
  });
}

export function useUpdateLead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: { id: number } & Partial<InsertLead>) => {
      const url = buildUrl(api.leads.update.path, { id });
      const res = await fetch(url, {
        method: api.leads.update.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });

      if (!res.ok) throw new Error("Failed to update lead");
      return api.leads.update.responses[200].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.leads.list.path] });
    },
  });
}

export function useDeleteLead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, reason }: { id: number; reason: string }) => {
      const url = buildUrl(api.leads.delete.path, { id });
      const res = await fetch(url, {
        method: api.leads.delete.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reason }),
      });
      if (!res.ok) throw new Error("Failed to delete lead");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.leads.list.path] });
      queryClient.invalidateQueries({ queryKey: ["/api/leads/deleted"] });
    },
  });
}

export function useDeletedLeads() {
  return useQuery({
    queryKey: ["/api/leads/deleted"],
    queryFn: async () => {
      const res = await fetch("/api/leads/deleted");
      if (!res.ok) throw new Error("Failed to fetch deleted leads");
      return res.json();
    },
  });
}

export function useRestoreLead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`/api/leads/${id}/restore`, {
        method: "PATCH",
      });
      if (!res.ok) throw new Error("Failed to restore lead");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.leads.list.path] });
      queryClient.invalidateQueries({ queryKey: ["/api/leads/deleted"] });
    },
  });
}

export function useGenerateLeads() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: { industry: string; region: string; count?: number; product?: string; industries?: string[] }) => {
      const res = await fetch("/api/leads/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params),
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to generate leads");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.leads.list.path] });
    },
  });
}
