"use client";

import React, { useState } from "react";
import { FileText, Plus, Edit, Trash2, Eye, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Template {
    id: string;
    name: string;
    content: string;
    type: 'payment_due' | 'reminder' | 'confirmation';
    createdAt: Date;
}

export function TemplateManagement() {
    const [templates, setTemplates] = useState<Template[]>([
        {
            id: '1',
            name: 'Payment Due Reminder',
            content: 'Dear Rahul, your payment of $50 is due on 02/02/2026. Please ensure timely payment to avoid any disruptions.',
            type: 'payment_due',
            createdAt: new Date('2026-01-15')
        },
        {
            id: '2',
            name: 'Payment Confirmation',
            content: 'Thank you Shyam for your payment of $65. Your transaction has been processed successfully.',
            type: 'confirmation',
            createdAt: new Date('2026-01-10')
        }
    ]);

    const [isAddingTemplate, setIsAddingTemplate] = useState(false);
    const [editingTemplate, setEditingTemplate] = useState<string | null>(null);
    const [viewingTemplate, setViewingTemplate] = useState<string | null>(null);
    const [newTemplate, setNewTemplate] = useState({
        name: '',
        content: '',
        type: 'payment_due' as Template['type']
    });

    const handleAddTemplate = () => {
        if (newTemplate.name.trim() && newTemplate.content.trim()) {
            const template: Template = {
                id: Date.now().toString(),
                name: newTemplate.name,
                content: newTemplate.content,
                type: newTemplate.type,
                createdAt: new Date()
            };
            setTemplates([...templates, template]);
            setNewTemplate({ name: '', content: '', type: 'payment_due' });
            setIsAddingTemplate(false);
        }
    };

    const handleEditTemplate = (id: string, updatedTemplate: Partial<Template>) => {
        setTemplates(templates.map(template =>
            template.id === id ? { ...template, ...updatedTemplate } : template
        ));
        setEditingTemplate(null);
    };

    const handleDeleteTemplate = (id: string) => {
        if (confirm('Are you sure you want to delete this template?')) {
            setTemplates(templates.filter(template => template.id !== id));
        }
    };

    const getTypeColor = (type: Template['type']) => {
        switch (type) {
            case 'payment_due': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
            case 'reminder': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
            case 'confirmation': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-blue-600" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Message Templates
                    </h3>
                </div>
                <Button
                    onClick={() => setIsAddingTemplate(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                    disabled={isAddingTemplate}
                >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Template
                </Button>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-400">
                Manage templates for payment reminders, confirmations, and other customer communications.
                Use placeholders like {"{{customer_name}}"}, {"{{amount}}"}, {"{{due_date}}"} in your templates.
            </p>

            {/* Add Template Form */}
            {isAddingTemplate && (
                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                    <h4 className="text-md font-medium mb-4 text-gray-900 dark:text-white">Add New Template</h4>
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-3">
                                <Label htmlFor="template-name">Template Name</Label>
                                <Input
                                    id="template-name"
                                    value={newTemplate.name}
                                    onChange={(e) => setNewTemplate({...newTemplate, name: e.target.value})}
                                    placeholder="e.g., Payment Due Reminder"
                                />
                            </div>
                            <div className="space-y-3">
                                <Label htmlFor="template-type">Template Type</Label>
                                <select
                                    id="template-type"
                                    value={newTemplate.type}
                                    onChange={(e) => setNewTemplate({...newTemplate, type: e.target.value as Template['type']})}
                                    className="flex h-[48px] w-full rounded-lg border border-input bg-transparent px-4 py-2 text-sm shadow-sm"
                                >
                                    <option value="payment_due">Payment Due</option>
                                    <option value="reminder">Reminder</option>
                                    <option value="confirmation">Confirmation</option>
                                </select>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <Label htmlFor="template-content">Template Content</Label>
                            <Textarea
                                id="template-content"
                                value={newTemplate.content}
                                onChange={(e) => setNewTemplate({...newTemplate, content: e.target.value})}
                                placeholder="Enter your message template..."
                                rows={4}
                            />
                        </div>
                        <div className="flex gap-2">
                            <Button onClick={handleAddTemplate} className="bg-green-600 hover:bg-green-700">
                                <Save className="h-4 w-4 mr-2" />
                                Save Template
                            </Button>
                            <Button
                                onClick={() => {
                                    setIsAddingTemplate(false);
                                    setNewTemplate({ name: '', content: '', type: 'payment_due' });
                                }}
                                variant="outline"
                            >
                                <X className="h-4 w-4 mr-2" />
                                Cancel
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Templates List */}
            <div className="space-y-4">
                {templates.map((template) => (
                    <div key={template.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800/50">
                        {editingTemplate === template.id ? (
                            <EditTemplateForm
                                template={template}
                                onSave={(updatedTemplate) => handleEditTemplate(template.id, updatedTemplate)}
                                onCancel={() => setEditingTemplate(null)}
                            />
                        ) : viewingTemplate === template.id ? (
                            <ViewTemplate
                                template={template}
                                onClose={() => setViewingTemplate(null)}
                            />
                        ) : (
                            <div className="flex items-center justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-4 mb-4">
                                        <h4 className="font-medium text-gray-900 dark:text-white">{template.name}</h4>
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(template.type)}`}>
                                            {template.type.replace('_', ' ').toUpperCase()}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                                        {template.content}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                                        Created: {template.createdAt.toLocaleDateString()}
                                    </p>
                                </div>
                                <div className="flex gap-2 ml-4">
                                    <Button
                                        onClick={() => setViewingTemplate(template.id)}
                                        variant="outline"
                                        size="sm"
                                    >
                                        <Eye className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        onClick={() => setEditingTemplate(template.id)}
                                        variant="outline"
                                        size="sm"
                                    >
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        onClick={() => handleDeleteTemplate(template.id)}
                                        variant="outline"
                                        size="sm"
                                        className="text-red-600 hover:text-red-700"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {templates.length === 0 && !isAddingTemplate && (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No templates created yet. Click "Add Template" to get started.</p>
                </div>
            )}
        </div>
    );
}

function EditTemplateForm({
    template,
    onSave,
    onCancel
}: {
    template: Template;
    onSave: (updatedTemplate: Partial<Template>) => void;
    onCancel: () => void;
}) {
    const [name, setName] = useState(template.name);
    const [content, setContent] = useState(template.content);
    const [type, setType] = useState(template.type);

    const handleSave = () => {
        if (name.trim() && content.trim()) {
            onSave({ name, content, type });
        }
    };

    return (
        <div className="space-y-6">
            <h4 className="text-md font-medium text-gray-900 dark:text-white">Edit Template</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                    <Label>Template Name</Label>
                    <Input value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="space-y-3">
                    <Label>Template Type</Label>
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value as Template['type'])}
                        className="flex h-[48px] w-full rounded-lg border border-input bg-transparent px-4 py-2 text-sm shadow-sm"
                    >
                        <option value="payment_due">Payment Due</option>
                        <option value="reminder">Reminder</option>
                        <option value="confirmation">Confirmation</option>
                    </select>
                </div>
            </div>
            <div className="space-y-3">
                <Label>Template Content</Label>
                <Textarea value={content} onChange={(e) => setContent(e.target.value)} rows={4} />
            </div>
            <div className="flex gap-2">
                <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                </Button>
                <Button onClick={onCancel} variant="outline">
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                </Button>
            </div>
        </div>
    );
}

function ViewTemplate({ template, onClose }: { template: Template; onClose: () => void }) {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h4 className="text-lg font-medium text-gray-900 dark:text-white">{template.name}</h4>
                <Button onClick={onClose} variant="outline" size="sm">
                    <X className="h-4 w-4" />
                </Button>
            </div>
            <div className="flex items-center gap-4 mb-6">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(template.type)}`}>
                    {template.type.replace('_', ' ').toUpperCase()}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-500">
                    Created: {template.createdAt.toLocaleDateString()}
                </span>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <Label className="text-sm font-medium mb-3 block">Template Content:</Label>
                <div className="text-sm text-gray-900 dark:text-white whitespace-pre-wrap">
                    {template.content}
                </div>
            </div>
        </div>
    );
}

function getTypeColor(type: Template['type']) {
    switch (type) {
        case 'payment_due': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
        case 'reminder': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
        case 'confirmation': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
    }
}